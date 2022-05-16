import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import * as XLSX from "xlsx";

import fichaTecnicaContext from "../../context/fichaTecnica/fichaTecnicaContext";
import tablaContext from "../../context/tabla/tablaContext";
import Select from "./Select";
import Swal from "sweetalert2";
import { round } from "../../utils";
import { GridTable, useGridTable } from "../GridTable";
import alertContext from "../../context/alertas/alertaContext";

function Tabla() {
  /////////////////////
  const alertascontext = useContext(alertContext);
  const { alerta, mostrarAlerta } = alertascontext;
  /////////////////////////////
  const [discount, setDiscount] = useState("");
  const tablacontext = useContext(tablaContext);
  const {
    tablaDatos,
    agregarDatosTabla,
    guardarCotizacionEnLaBd,
    eliminarDatosTabla,
    mensajeTabla,
    mensajeErrorDetalleTabla,
  } = tablacontext;
  ///////////////////////////////
  const fichatecnicacontext = useContext(fichaTecnicaContext);
  const {
    fichaTecnica,
    fichaEdicion,
    guardarCotizacion,
    obtenerTodasLasFichasTecnicas,
  } = fichatecnicacontext;
  //////////////////////////////
  const [botonActivo, setBotonActivo] = useState(true);

  useEffect(() => {
    if (mensajeTabla) {
      console.log(mensajeTabla);
      mostrarAlerta(mensajeTabla.msg, mensajeTabla.categoria);
    }
  }, [mensajeTabla]);

  useEffect(() => {
    obtenerTodasLasFichasTecnicas();
  }, [fichaTecnica, fichaEdicion]);

  /* COLUMNAS */
  const columns = [
    {
      headerName: "idDetallefichatecnica",
      field: "idDetallefichatecnica",
      show: false,
    },
    {
      headerName: "Partida",
      field: "partidaDetallefichatecnica",
      filter: false,
      /*  headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true, */
      headerCheckboxSelection: true,
    },
    {
      headerName: "SubPartida",
      field: "subpartidaDetallefichatecnica",
      filter: false,
      filter: true,
    },
    {
      headerName: "Marca",
      field: "marcaDetallefichatecnica",
      filter: false,
    },
    {
      headerName: "Codigo ERP",
      field: "codigosoftcomProducto",
      filter: false,
    },
    {
      headerName: "Codido Proveedor",
      field: "codigoproveedorDetallefichatecnica",
      filter: false,
    },

    {
      headerName: "Descripcion",
      field: "descripcionDetallefichatecnica",
      filter: false,
    },
    {
      headerName: "Cantidad Total",
      field: "cantidadDetallefichatecnica",
      filter: false,
    },
    {
      headerName: "PreUnitario",
      field: "preciounitarioDetallefichatecnica",
      filter: false,

      render: ({ value, setValue, rowState }) => {
        const cellPrecioConD = rowState.state.find(
          (cell) => cell.key === "preciocondescuento"
        );
        const rowData = rowState.data;

        const getPrecioConDescuento = (preUnit) => {
          const cantidad = Number(rowData.cantidadDetallefichatecnica);
          const precioTotal = cantidad * preUnit;

          const descuento = Number(
            rowData.descuentounitarioDetallefichatecnica || 0
          );
          const precio = Number(precioTotal || 0);
          const resultadoDescuentoUnitario = precio * (1 - descuento / 100);
          const descuentoGeneral = Number(
            rowData.descuentototalDetallefichatecnica || 0
          );

          return resultadoDescuentoUnitario * (1 - descuentoGeneral / 100);
        };
        //console.log("->>>>>>>>>", value);
        // precioConD.setValue()
        const { options, isManual } = value;
        return isManual ? (
          <input
            type="number"
            value={options.optionSelected || 0}
            onChange={(e) => {
              setValue({
                ...options,
                optionSelected: e.target.value,
              });
            }}
          />
        ) : (
          <Select
            data={options}
            setValue={(newValue) => {
              setValue(newValue);
              const precioConD = getPrecioConDescuento(
                Number(newValue.options.optionSelected)
              );

              const format2Decimals = new Intl.NumberFormat("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
              cellPrecioConD.setValue(format2Decimals.format(precioConD));
            }}
          />
        );
      },
    },
    {
      headerName: "Precio Total",
      field: "preciototalDetallefichatecnica",
      filter: false,
      getValue(rowData) {
        const precioTotal =
          Number(
            rowData.preciounitarioDetallefichatecnica.options.optionSelected
          ) * Number(rowData.cantidadDetallefichatecnica);
        return precioTotal;
      },
      render: ({ value, rowState: { data } }) => {
        const precioTotal =
          value ||
          Number(
            data.preciounitarioDetallefichatecnica.options.optionSelected
          ) * Number(data.cantidadDetallefichatecnica);
        const isDecimal = precioTotal - Math.floor(precioTotal) !== 0;

        const result = `$ ${
          isDecimal
            ? round(precioTotal, 2).toFixed(2)
            : precioTotal /* + ".00" */
        }`;

        return result;
      },
    },
    {
      headerName: "Costo Diseño",
      field: "costodisenoProducto",
      filter: false,
    },
    {
      headerName: "Costo Total",
      field: "costototaling",
      filter: false,
      getValue(data) {
        const { cantidadDetallefichatecnica, costodisenoProducto } = data;
        const cantidad = Number(cantidadDetallefichatecnica);
        const costo = Number(costodisenoProducto);
        const costoFinal = cantidad * costo;
        return costoFinal;
      },
      render: ({ value }) => {
        return <span>{value}</span>;
      },
    },
    {
      headerName: "Ingrese Descuento %",
      field: "descuentounitarioDetallefichatecnica",
      getValue(rowData) {
        if (rowData.descuentounitarioDetallefichatecnica === null) {
          return 0;
        }
        return rowData.descuentounitarioDetallefichatecnica;
      },
      render: ({ value, setValue }) => {
        return (
          <input
            type="number"
            value={value || 0}
            //value={0}
            // value={value === 2 ? value === 100 : value}
            // onChange={(e) => setValue(Number(e.target.value))}
            onChange={(e) => setValue(e.target.value)}
            //onChange={(e) => setValue(value === 0 ? 100 : Number(e.target.value))}
          />
        );
      },
    },
    {
      label: "Descuento general",
      field: "descuentototalDetallefichatecnica",
      filter: false,
      getValue(rowData) {
        if (
          rowData.descuentototalDetallefichatecnica === undefined ||
          rowData.descuentototalDetallefichatecnica === null
        ) {
          return 0;
        }
        return rowData.descuentototalDetallefichatecnica;
      },
    },
    {
      headerName: "Precio Con descuento",
      key: "preciocondescuento",
      filter: false,
      getValue(rowData) {
        const descuento = Number(
          rowData.descuentounitarioDetallefichatecnica || 0
        );
        //console.log("valor de descuento", descuento);
        const precio = Number(rowData.preciototalDetallefichatecnica || 0);
        const resultadoDescuentoUnitario = precio * (1 - descuento / 100);
        const descuentoGeneral = Number(
          rowData.descuentototalDetallefichatecnica || 0
        );
        const format2Decimals = new Intl.NumberFormat("de-DE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        return format2Decimals.format(
          resultadoDescuentoUnitario * (1 - descuentoGeneral / 100)
        );
      },
      render: ({ value }) => {
        return <span>$ {value}</span>;
      },
    },
  ].map((col) => ({
    label: col.headerName,
    width: "100px",
    key: col.field,
    ...col,
  }));
  /* COLUMNAS */
  //console.log(tablaDatos);

  /* para importar un excel y convertilo en un array de objetos */

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((itemsFinales) => {
      //setItems(d);
      const items = itemsFinales;
      const agregarId = items.map((item) => ({
        ...item,
        idFichatecnica: fichaTecnica[0].idFichatecnica,
      }));
      agregarDatosTabla(agregarId); // ESTO ES LO Q SE ENVIA PRIMERO AL BACKEND Y SE REGRESA EN tablaDatos
    });
  };
  /* para importar un excel y convertilo en un array de objetos */

  const finalTablaDatos = useMemo(() => {
    return tablaDatos.map((rowData) => {
      const newRowData = { ...rowData };
      if (!newRowData.preciounitarioDetallefichatecnica) {
        const {
          precioventaunoProducto,
          precioventadosProducto,
          precioventatresProducto,
          precioventacuatroProducto,
          //precioventacincoProducto,
        } = newRowData;
        const options = {
          optionSelected: precioventatresProducto,
          precioventaunoProducto,
          precioventadosProducto,
          precioventatresProducto,
          precioventacuatroProducto,
          //precioventacincoProducto,
        };
        const isManual = Object.keys(options).every(
          (key) => options[key] === 0
        );

        newRowData.preciounitarioDetallefichatecnica = { options, isManual };
      }
      return newRowData;
    });
  }, [tablaDatos]);

  const { gridTable } = useGridTable({
    data: finalTablaDatos,
    definitions: {
      columnsDefinition: columns,
      rowsDefinition: { idKey: "idDetallefichatecnica" },
    },
  });

  const applyDiscount = () => {
    const rowsStates = gridTable.fullState.state;
    rowsStates
      .filter((row) => row.show)
      .forEach((rowState) => {
        const discountCell = rowState.state.find((cellState) => {
          return cellState.key === "descuentototalDetallefichatecnica";
        });
        // console.log(discountCell.value);
        //discountCell?.setValue(discount);
        console.log("el valor de discount es", discount);
        discount === 0
          ? discountCell?.setValue("0")
          : discountCell?.setValue(discount);
        //console.log(discountCell.value);
      });
  };

  const [isFirstUpdate, setIsFirstUpdate] = useState(false);
  const updatePrecioTotal = useCallback(() => {
    gridTable.fullState.state.forEach((rowState) => {
      const precioTotalCell = rowState.state.find((cellState) => {
        return cellState.key === "preciototalDetallefichatecnica";
      });
      const cantidad = rowState.state.find((cellState) => {
        return cellState.key === "cantidadDetallefichatecnica";
      });
      const preUnitario = rowState.state.find((cellState) => {
        return cellState.key === "preciounitarioDetallefichatecnica";
      });
      precioTotalCell?.setValue(
        Number(cantidad.value) *
          Number(preUnitario.value.options.optionSelected)
      );
    });
  }, [gridTable.fullState.state]);

  useEffect(() => {
    if (!isFirstUpdate && gridTable.fullState.state.length > 0) {
      updatePrecioTotal();
      setIsFirstUpdate(true);
    }
  }, [gridTable.fullState.state, isFirstUpdate, updatePrecioTotal]);

  const dataUpdated = useMemo(() => {
    const data = gridTable.fullState.state.map((rowState) => {
      const rowData = {};
      rowState.state.forEach((cellState) => {
        rowData[cellState.key] = cellState.value;
      });
      return rowData;
    });
    return data;
  }, [gridTable.fullState.state]);

  /* const download = useCallback(() => {
    const filename = "results.xlsx";
    const dataForExcel = dataUpdated.map((data) => ({
      ...data,
      preciounitarioDetallefichatecnica:
        data.preciounitarioDetallefichatecnica.options.optionSelected,
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    XLSX.writeFile(workbook, filename);
  }, [dataUpdated]); */

  //console.log("Datos actualizados que es lo que yo enviare", dataUpdated);

  const EnviarguardadoCotizacion = async () => {
    const accionUsuario = await Swal.fire({
      icon: "warning",
      title: "Recuerde que una ves enviado no se podra modificar mas",
      showConfirmButton: true,
      showCancelButton: true,
    });

    if (accionUsuario.isConfirmed) {
      guardarCotizacion(fichaTecnica[0].idFichatecnica);
      setBotonActivo(false);
      // guardarCotizacion(fichaTecnica[0].idFichatecnica); //mando ID DE LA FICHA TECNICA
      setTimeout(() => {
        setBotonActivo(true);
      }, 4200);
    }
  };

  const cotizacionGuardadaEnLaBd = () => {
    //BOTON GUARDAR
    // console.log("se guardo", dataUpdated);
    //console.log("este es el id de esta ficha", fichaTecnica[0].idFichatecnica);

    const tablaConIdDeFichaTecnica = dataUpdated.map((item) => ({
      ...item,
      idFichatecnica: fichaTecnica[0].idFichatecnica,
    }));
    console.log(
      "HICISTE CLICK EN EL BOTON GUARDAR Y SE ENVIO ESTO",
      tablaConIdDeFichaTecnica
    );
    guardarCotizacionEnLaBd(tablaConIdDeFichaTecnica);
  };

  const eliminarTabla = async () => {
    console.log("tabla eliminada id ", fichaTecnica[0].idFichatecnica);

    const accionUsuario = await Swal.fire({
      icon: "warning",
      title: "Si elimina , por favor recarge la pagina",
      showConfirmButton: true,
      showCancelButton: true,
    });

    if (accionUsuario.isConfirmed) {
      eliminarDatosTabla(fichaTecnica[0].idFichatecnica);
    }
  };

  const cambiarEstado = () => {
    setBotonActivo(false);

    setTimeout(() => {
      setBotonActivo(true);
    }, 2500);
  };

  if (!fichaTecnica)
    return (
      <h3 className="fw-bolder mt-3 text-uppercase">
        Seleccionar "Ver lista de materiales"para empezar a Trabajar
      </h3>
    ); // solo puede haber un return
  return (
    <div>
      <div className="row mt-3 mb-4">
        <p className="h3 text-uppercase">
          Esta en{" "}
          <strong className="text-primary ">
            {fichaTecnica[0].nombreFichatecnica} -{" "}
            {fichaTecnica[0].numFichatecnica}
          </strong>
        </p>
        <div className="col-12 col-md-6 mb-2">
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
          />
        </div>
        <div className="col-12 col-md-6 mb-2">
          <div className="d-flex">
            <input
              className="form-control w-50"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
            <button
              className="btn btn-success ms-2 w-100"
              onClick={() => applyDiscount()}
            >
              Aplicar descuento general
            </button>
          </div>
        </div>
      </div>
      {/* TABLA */}
      <div className="row">
        <div className="col-12 ">
          <div
            id="myGrid"
            className="ag-theme-alpine"
            style={{ height: 400, width: "100%", overflow: "scroll" }}
          >
            <GridTable gridTable={gridTable} />
          </div>
        </div>
        {alerta ? (
          <div className={`${alerta.categoria} my-3`} role="alert">
            {alerta.msg}
          </div>
        ) : null}
        {mensajeErrorDetalleTabla && (
          <div>
            <p className="h-3 bg-secondary py-3 mt-1 text-white text-center text-uppercase fw-bolder">
              Los numeros de fila mencionados pertenecen al excel
            </p>
            {mensajeErrorDetalleTabla.map((error) => (
              <p className="text-uppercase text-danger fw-bolder my-2">
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
      {/* TABLA */}
      <div className="row mt-3 mb-3">
        <div className="col-12 text-end">
          {fichaTecnica[0].cotizacionenviadaFichatecnica === "1" ? (
            <p className="text-success text-uppercase">
              Informacion enviada exitosamente
            </p>
          ) : (
            <>
              <button
                className=" btn btn-warning ms-3"
                disabled={!botonActivo}
                onClick={() => {
                  eliminarTabla();
                }}
              >
                Limpiar Tabla
              </button>
              <button
                className=" btn btn-success ms-3"
                onClick={() => {
                  EnviarguardadoCotizacion();
                }}
                disabled={!botonActivo}
              >
                Guardar Cotizacion Final
              </button>

              <button
                onClick={() => {
                  cotizacionGuardadaEnLaBd();
                  cambiarEstado();
                }}
                className="btn btn-secondary ms-3"
                disabled={!botonActivo}
              >
                Guardar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tabla;
