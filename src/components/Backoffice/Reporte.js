import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import NavBar from "../../views/NavBar";
import tablaContext from "../../context/tabla/tablaContext";
import fichaTecnicaContext from "../../context/fichaTecnica/fichaTecnicaContext";

function Reporte() {
  //////////////////////
  const tablacontext = useContext(tablaContext);
  const { obtenerDatosTablaReporte, tablaDatosGerenteGeneral } = tablacontext;
  ////////////////////////
  ///////////////////////////////
  const fichatecnicacontext = useContext(fichaTecnicaContext);
  const { excelReporteDos } = fichatecnicacontext;

  //////////////////////////////

  const { id } = useParams();
  //console.log(id);

  useEffect(() => {
    obtenerDatosTablaReporte(id);
  }, []);

  const descargarExcelReporteDos = () => {
    console.log("entraste a descargarExcelReporteDos");
    excelReporteDos(id);
  };

  const columns = [
    {
      headerName: "Partida",
      field: "partidaDetallefichatecnica",
    },
    {
      headerName: "SubPartida",
      field: "subpartidaDetallefichatecnica",
    },
    {
      headerName: "Marca",
      field: "marcaDetallefichatecnica",
    },
    {
      headerName: "Codido ERP",
      field: "codigosoftcomProducto",
    },
    {
      headerName: "Codido Proveedor",
      field: "codigoproveedorDetallefichatecnica",
    },
    {
      headerName: "Descripcion",
      field: "descripcionDetallefichatecnica",
    },
    {
      headerName: "UND",
      field: "undProducto",
    },
    {
      headerName: "Cantidad",
      field: "cantidadDetallefichatecnica",
    },
    {
      headerName: "P.UNIT",
      field: "preciounitarioDetallefichatecnica",
      cellRendererFramework: (params) => (
        <>
          <span>$ {params.data.preciounitarioDetallefichatecnica}</span>
        </>
      ),
    },
    {
      headerName: "SubTotal",
      field: "preciodescuentoDetallefichatecnica",
      cellRendererFramework: (params) => (
        <>
          <span>$ {params.data.preciodescuentoDetallefichatecnica}</span>
        </>
      ),
    },
  ];

  const defaultColDef = {
    /* filter: true, */
    /*  filter: true,
    floatingFilter: true, */
    //editable: true,
    resizable: true,
  };
  //const rowSelectionType = "single";
  const rowSelectionType = "multiple";
  const onSelectionChanged = (event) => {
    console.log(event.api.getSelectedRows());
  };
  /////////////////////
  const [listaChecks, setListaChecks] = useState({
    partida: false,
    subPartida: false,
    precioUnitario: false,
    subTotal: false,
  });
  const { partida, subPartida, precioUnitario, subTotal } = listaChecks;
  const handleChange = (event) => {
    setListaChecks({
      ...listaChecks,
      [event.target.name]: event.target.checked,
    });
    // console.log("soy checked", listaChecks);
  };

  const [botonActivo, setBotonActivo] = useState(true);
  const manejarSubmit = (e) => {
    e.preventDefault();
    console.log("entraste a manejarSubmit");
    console.log("soy checked", listaChecks);
    const listaChecksConId = { ...listaChecks, id };
    const { partida, subPartida, precioUnitario, subTotal } = listaChecksConId;
    console.log("listaChecksConId", listaChecksConId);
    //const prueba = JSON.stringify(listaChecksConId);
    //console.log(prueba);
    /*   console.log(
      `hola ${id}&${partida}&${subPartida}&${precioUnitario}&${subTotal}`
    ); */
    excelReporteDos(
      `${id}&${partida}&${subPartida}&${precioUnitario}&${subTotal}`
    );
    setBotonActivo(false);
    setTimeout(() => {
      setBotonActivo(true);
    }, 4200);
  };
  return (
    <>
      {/* <NavBar /> */}
      <div className="container-fluid">
        <h2 className="text-uppercase text-primary fw-bold bg-light py-4">
          Reporte Presupuesto-cotizacion
        </h2>
        <ul>
          <li>.Con las casillas seleccionadas se descargara el reporte.</li>
        </ul>
        <div className="row">
          <p className="text-uppercase">Selecciona sus casillas</p>
          <form onSubmit={(e) => manejarSubmit(e)}>
            <label>
              <input
                type="checkbox"
                name="partida"
                checked={partida}
                onChange={handleChange}
              />
              Partida
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="subPartida"
                checked={subPartida}
                onChange={handleChange}
              />
              Sub-partida
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="precioUnitario"
                checked={precioUnitario}
                onChange={handleChange}
              />
              P.Unitario
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="subTotal"
                checked={subTotal}
                onChange={handleChange}
              />
              subTotal
            </label>
            <br />
            <button
              type="submit"
              className=" btn btn-success my-3"
              disabled={!botonActivo}
            >
              Descargando
            </button>
          </form>
        </div>
        <div
          id="myGrid"
          className="ag-theme-alpine"
          style={{ height: 400, width: "100%" }}
        >
          <AgGridReact
            rowData={tablaDatosGerenteGeneral}
            columnDefs={columns}
            defaultColDef={defaultColDef}
            rowSelection={rowSelectionType} //selecciona una fila
            onSelectionChanged={onSelectionChanged}
            // autoGroupColumnDef={autoGroupColumnDef}
            //  suppressRowClickSelection={true}
            //rowSelection={"multiple"}
            //onGridReady={onGridReady}

            // onSelectionChanged={onSelectionChanged} //selecciona varias filas con control
            //rowMultiSelectWithClick={true}
          />
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <NavLink
              to={"/sesioniniciada"}
              className="mt-3 btn btn-primary w-50"
            >
              {"<"} Regresar
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reporte;
