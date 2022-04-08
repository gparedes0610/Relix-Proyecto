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
      field: "und, ",
    },
    {
      headerName: "Cantidad",
      field: "cantidadDetallefichatecnica, ",
    },
    {
      headerName: "P.UNIT",
      field: "preciounitarioDetallefichatecnica ",
    },
    {
      headerName: "SubTotal",
      field: "preciototalDetallefichatecnica ",
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
  const manejarSubmit = (e) => {
    e.preventDefault();
    console.log("entraste a manejarSubmit");
    console.log("soy checked", listaChecks);
    const listaChecksConId = { ...listaChecks, id };
    console.log("listaChecksConId", listaChecksConId);
    const prueba = JSON.stringify(listaChecksConId);
    console.log(prueba);
    excelReporteDos(prueba);
  };
  return (
    <>
      {/* <NavBar /> */}
      <div className="container-fluid">
        <h2 className="text-uppercase text-primary">
          Reporte Presupuesto-cotizacion
        </h2>
        <ul>
          <li>.Click derecha en la tabla y seleccionar su tipo de descarga.</li>
          <li>
            .Click en "Descargar Excel completo" para descargar el excel con el
            formato acordado.
          </li>
        </ul>
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
            <NavLink to={"/sesioniniciada"} className="mt-3 btn btn-primary">
              Regresar
            </NavLink>
          </div>
          <div className="col-12 col-md-6  d-flex justify-content-end">
            {/* <a
              href={`http://relixapi.mskdevmusic.com/ExcelReporteDos/${id}`}
              target="_blank"
              className="btn btn-warning mt-3 text-end"
            >
              Descargar Excel completo
            </a> */}
            <button
              onClick={() => {
                descargarExcelReporteDos();
              }}
            >
              Descarga
            </button>
          </div>
        </div>
        <div className="row">
          <p>Con las casillas seleccionadas saldra el reporte.</p>
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
              P.Unitario
            </label>
            <br />
            <button type="submit">Descargando</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Reporte;
