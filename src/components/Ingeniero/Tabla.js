import React, { useContext, useEffect, useState, useMemo } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import * as XLSX from "xlsx";

import fichaTecnicaContext from "../../context/fichaTecnica/fichaTecnicaContext";
import tablaContext from "../../context/tabla/tablaContext";
import Select from "./Select";
import Swal from "sweetalert2";
import { round } from "../../utils";

function Tabla() {
  /////////////////////////////
  const tablacontext = useContext(tablaContext);
  const { tablaDatos, agregarDatosTabla, guardarCotizacion } = tablacontext;
  //////////////////////////
  ///////////////////////////////
  const fichatecnicacontext = useContext(fichaTecnicaContext);
  const { fichaTecnica } = fichatecnicacontext;
  //console.log("ficha tecnica", fichaTecnica);
  //////////////////////////////
  //useEffect(() => {}, [fichaTecnica]);
  console.log("tabla de datos", tablaDatos);
  const [dataTabla, setDataTabla] = useState([]);
  const [IdFichaDataTabla, setIdFichaDataTabla] = useState([]);

  const [prueba, setPrueba] = useState("");

  const [verPrecios, setVerPrecios] = useState(false);

  useEffect(() => {}, [verPrecios]);

  /* COLUMNAS */
  const columns = [
    {
      headerName: "Partida",
      field: "partidaDetallefichatecnica",
      filter: true,
      /*  headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true, */
      headerCheckboxSelection: true,
    },
    {
      headerName: "SubPartida",
      field: "subpartidaDetallefichatecnica",
    },
    {
      headerName: "Marca",
      field: "marcaDetallefichatecnica",
      filter: true,
    },
    {
      headerName: "Codido Proveedor",
      field: "codigoproveedorDetallefichatecnica",
    },
    {
      headerName: "Codigo ERP",
      field: "codigosoftcomProducto",
    },
    {
      headerName: "Descripcion",
      field: "descripcionDetallefichatecnica",
    },
    {
      headerName: "Cantidad Total",
      field: "cantidadDetallefichatecnica",
    },
    {
      headerName: "PreUnitario",
      field: "preUnitario",
      cellRendererFramework: (params) => (
        <>
          <Select data={params.data} keyId={"idDetallefichatecnica"} />
        </>
      ),
    },
    {
      headerName: "Precio Total",
      field: "precioTotal",
      valueGetter: (params) => {
        const precioTotal =
          (params.data.optionSelected ||
            params.data.precioventacuatroProducto) *
          params.data.cantidadDetallefichatecnica;

        const isDecimal = precioTotal - Math.floor(precioTotal) !== 0;

        const result = `S/ ${
          isDecimal ? round(precioTotal, 2).toFixed(2) : precioTotal + ".00"
        }`;

        return result;
      },
    },
    {
      headerName: "Costo Ing",
      field: "costopromedioProducto",
    },
    {
      headerName: "Costo Total",
      field: "costototaling",
      cellRendererFramework: (params) => (
        <>
          <span>
            {params.data.cantidadDetallefichatecnica *
              params.data.costopromedioProducto}
          </span>
        </>
      ),
    },
    {
      headerName: "Ingrese Descuento %",
      field: "descuento",
      editable: true,
    },
    {
      headerName: "Precio Con descuento",
      field: "preciocondescuento",
    },
    {
      headerName: "Acciones",
      field: "acciones",
      sortable: false,
      editable: false,
      filter: false,

      cellRendererFramework: (params) => (
        <div>
          <buttonc
            className="btn btn-primary"
            onClick={() => actionButton(params)}
          >
            Aplicar
          </buttonc>{" "}
        </div>
      ),
    },
  ];
  /* COLUMNAS */

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Athlete",
      field: "athlete",
      minWidth: 250,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        checkbox: true,
      },
    };
  }, []);
  const actionButton = (params) => {
    console.log("toda la fila", params.data, params.data.idDetallefichatecnica);
    console.log(params.data);
    console.log("este es el id", params.data.idDetallefichatecnica);
    console.log("este es el Precio Total", params.data.precioTotal);
    console.log("este es el multiplo", parseInt(params.data.multiplo));
    const numAMultiplicar = params.data.descuento;
    const porcertajeNumero = numAMultiplicar / 100;
    console.log(porcertajeNumero);
    const idRow = params.data.idDetallefichatecnica;
    console.log("soy idRow", idRow);
    console.log("soy gridApi", gridApi);
    console.log("soy gridApi.getRowNode", gridApi.getRowNode(0));
    var rowNode = gridApi.getRowNode(idRow - 1);
    console.log("soy rowNode", rowNode);
    console.log(rowNode.data);
    var newOperacion = rowNode.data.preciocondescuento * porcertajeNumero;
    var operacionFinal = params.data.preciocondescuento - newOperacion;
    rowNode.setDataValue("preciocondescuento", operacionFinal);
  };
  let gridApi;
  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const defaultColDef = {
    /* filter: true, */
    /*  filter: true,
    floatingFilter: true, */
    //editable: true,
    resizable: true,
  };

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
      // console.log(itemsFinales); ///////////////estos son los datos del excel pasado a objeto
      const items = itemsFinales;
      //console.log(items);
      const agregarId = items.map((item) => ({
        ...item,
        idFichatecnica: fichaTecnica[0].idFichatecnica,
      }));
      //console.log("agregado idFichaTecnica", agregarId);
      agregarDatosTabla(agregarId);
      //console.log("tabladatos", tablaDatos);
      //setDataTabla(tablaDatos);
      //setIdFichaDataTabla(itemsFinales);
    });
  };
  const rowSelectionType = "multiple";

  const getSelectedRowData = () => {
    console.log("entraste a getSelectedRowData ");
    let selectedNodes = gridApi.getSelectedNodes();
    console.log("selectNodes ", selectedNodes);
    let selectedData = selectedNodes.map((node) => node.data);
    console.log("filas", selectedData);
  };

  const onSelectionChanged = (event) => {
    //sirve para coger todo el objeto de una fila
    console.log(event.api.getSelectedRows());
    /* const fila = event.api.getSelectedRows();
    console.log(`soy fila agarrada`, fila); */
  };
  const EnviarguardadoCotizacion = async () => {
    console.log("se guardo cotizacion");
    console.log("ficha tecnica", fichaTecnica);
    console.log("esta es la id", fichaTecnica[0].idFichatecnica);

    const accionUsuario = await Swal.fire({
      icon: "warning",
      title: "Recuerde que se enviara un correo al Gerente General",
      showConfirmButton: true,
      showCancelButton: true,
    });

    if (accionUsuario.isConfirmed) {
      guardarCotizacion(fichaTecnica[0].idFichatecnica);
    }
  };

  if (!fichaTecnica)
    return (
      <h3 className="fw-bolder mt-3 text-uppercase">
        Cree tabla por ficha tecnica para trabajar
      </h3>
    ); // solo puede haber un return
  return (
    <div>
      {/* {tablaDatos.map((dato, i) => (
        <select>
          <option value={dato.precioventaunoProducto}>
            {dato.precioventaunoProducto}
          </option>
          <option value={dato.precioventadosProducto}>
            {dato.precioventadosProducto}
          </option>
          <option value={dato.precioventatresProducto}>
            {dato.precioventatresProducto}
          </option>
          <option value={dato.precioventacuatroProducto}>
            {dato.precioventacuatroProducto}
          </option>
          <option value="value1">{i}</option>
        </select>
      ))} */}
      {/*   Acciones */}
      <div className="row mt-3 mb-4">
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
              className="form-control"
              type="number"
              placeholder="Descuento Total"
            />
            <button className="btn btn-success ms-2">Aplicar</button>
          </div>
          {/* <div className="d-flex">
            <input
              className="form-control"
              type="number"
              placeholder="Dto por partida"
            />
            <select
              className="form-select"
              aria-label="Default select example"
              name="partida"
            >
              <option>Eliga una partida</option>
              <option>Partida1</option>
              <option>Partida2</option>
              <option>Partida3</option>
              <option>Partida4</option>
            </select>
            <button className="ms-2 btn btn-success">Aplicar</button>
          </div> */}
        </div>
      </div>

      {/* <div className="row mt-3 mb-3">
        <div className="col-12 col-md-6  mb-2">
          <div className="d-flex">
            <input
              className="form-control"
              type="number"
              placeholder="Descuento Total"
            />
            <button className="btn btn-success ms-2">Aplicar</button>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-2">
          <input className="form-control" type="Text" placeholder="Busqueda" />
        </div>
      </div> */}
      {/*   Acciones */}

      {/* TABLA */}
      <div className="row">
        {/* <button onClick={() => getSelectedRowData()} style={{ margin: 10 }}>
          Agarrar Filas
        </button> */}
        <div className="col-12 ">
          {/*  <div
            id="myGrid"
            className="ag-theme-alpine"
            style={{ height: 400, width: "100%" }}
          >
            <AgGridReact
              rowData={tablaDatos}
              columnDefs={columns}
              defaultColDef={defaultColDef}
              // autoGroupColumnDef={autoGroupColumnDef}
              //  suppressRowClickSelection={true}
              //rowSelection={"multiple"}
              onGridReady={onGridReady}
              // rowSelection={rowSelectionType}
              rowSelection={rowSelectionType} //selecciona una fila
              onSelectionChanged={onSelectionChanged} //selecciona varias filas con control
              //rowMultiSelectWithClick={true}
            />
          </div> */}
        </div>
      </div>
      {/* TABLA */}
      <div className="row mt-3 mb-3">
        <div className="col-12 col-md-6 text-start">
          {/* <button
            style={{
              border: "none",
              color: "white ",
              padding: "8px 16px",
            }}
            className="ms-3 btn-danger"
          >
            Modificar ficha tecnica
          </button> */}
        </div>
        <div className="col-12 col-md-6 text-end">
          <button
            style={{
              background: "#008DCA",
              border: "none",
              color: "white ",
              padding: "8px 16px",
            }}
            onClick={() => EnviarguardadoCotizacion()}
          >
            Guardar Cotizacion Final
          </button>

          <button
            style={{
              background: "#008DCA",
              border: "none",
              color: "white ",
              padding: "8px 16px",
            }}
            className="ms-3"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tabla;
