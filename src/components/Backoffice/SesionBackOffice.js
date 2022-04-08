import React, { useContext, useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import tablaContext from "../../context/tabla/tablaContext";
import fichaTecnicaContext from "../../context/fichaTecnica/fichaTecnicaContext";

import { obtenerFichasBackOffice } from "./apisBackOffice";
import ListaFichasBackOffice from "./ListaFichasBackOffice";
import ReportePipeLine from "./ReportePipeLine";

function SesionBackOffice() {
  //////////////////////
  const tablacontext = useContext(tablaContext);
  const { tablaDatosGerenteGeneral, rptaAltaNegocioAdministracion } =
    tablacontext;
  ////////////////////////
  ///////////////////////////////
  const fichatecnicacontext = useContext(fichaTecnicaContext);
  const { fichaTecnica, obtenerTodasLasFichasTecnicas } = fichatecnicacontext;
  //////////////////////////////
  const [mostrartabla, setMostrartabla] = useState(false);
  const [botonActivo, setBotonActivo] = useState(true);
  const [mostrarReportePipeLine, setMostrarReportePipeLine] = useState(false);

  const [fichasBackOffice, setFichasBackOffice] = useState([]);

  const getData = async () => {
    const obteniendoFichasAceptadas = await obtenerFichasBackOffice();
    try {
      setFichasBackOffice(obteniendoFichasAceptadas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    obtenerFichasBackOffice();
  }, []);

  /* COLUMNAS */
  const columns = [
    {
      headerName: "Partida",
      field: "partidaDetallefichatecnica",
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      /*  headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true, */
      //headerCheckboxSelection: true,
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
      headerName: "Codido Proveedor",
      field: "codigoproveedorDetallefichatecnica",
    },
    {
      headerName: "Codigo ERP",
      field: "codigosoftcomProducto",
      editable: true,
    },
    {
      headerName: "Descripcion",
      field: "descripcionDetallefichatecnica",
      editable: true,
    },
    {
      headerName: "Cantidad Total",
      field: "cantidadDetallefichatecnica",
    },
    {
      headerName: "Precio unitario",
      field: "preciounitarioDetallefichatecnica",
      cellRendererFramework: (params) => (
        <>
          <span>$ {params.data.preciounitarioDetallefichatecnica}</span>
        </>
      ),
    },
    {
      headerName: "Precio Total",
      field: `preciototalDetallefichatecnica`,
      cellRendererFramework: (params) => (
        <>
          <span>$ {params.data.preciototalDetallefichatecnica}</span>
        </>
      ),
    },
    {
      headerName: "Costo Diseño",
      field: "costoingDetallefichatecnica",
      cellRendererFramework: (params) => (
        <>
          <span>$ {params.data.costoingDetallefichatecnica}</span>
        </>
      ),
    },
    {
      headerName: "Costo Total",
      field: "costototalDetallefichatecnica",
      cellRendererFramework: (params) => (
        <>
          <span>$ {params.data.costototalDetallefichatecnica}</span>
        </>
      ),
    },
    {
      headerName: "Descuento unitario",
      field: "descuentounitarioDetallefichatecnica",
      cellRendererFramework: (params) => (
        <>
          <span> {params.data.descuentounitarioDetallefichatecnica} %</span>
        </>
      ),
    },
    {
      headerName: "Descuento General",
      field: "descuentototalDetallefichatecnica",
      cellRendererFramework: (params) => (
        <>
          <span> {params.data.descuentototalDetallefichatecnica} %</span>
        </>
      ),
    },
    {
      headerName: "Precio con descuento",
      field: "preciodescuentoDetallefichatecnica",
      cellRendererFramework: (params) => (
        <>
          <span>$ {params.data.preciodescuentoDetallefichatecnica}</span>
        </>
      ),
    },
    {
      headerName: "Observaciones",
      field: "observacionDetallefichatecnica",
      editable: true,
    },
    {
      headerName: "Acciones",
      field: "",
    },
  ];
  /* COLUMNAS */
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
  //seleccion de una fila se le pone  rowSelection={rowSelectionType} y luego la variable const rowSelectionType = "single"
  const mostrarReportePipeline = () => {
    setMostrarReportePipeLine(true);
    setMostrartabla(false);
  };
  return (
    <div className="container-fluid">
      <h3 className="text-success text-uppercase">Bienvenido BackOffice</h3>

      {mostrarReportePipeLine ? null : (
        <ul>
          <li className="lead">.Hacer click en "Ver Lista de Materiales".</li>
          <li className="lead">.Hacer los cambios respectivos.</li>
        </ul>
      )}
      <div className="row">
        {fichaTecnica ? (
          <p className="h3 text-uppercase">
            Esta en{" "}
            <strong className="text-primary ">
              {fichaTecnica[0].nombreFichatecnica} -{" "}
              {fichaTecnica[0].numFichatecnica}
            </strong>
          </p>
        ) : null}

        <div className=" col-12 col-xl-8">
          {mostrartabla ? (
            <div>
              <div>
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
              </div>
            </div>
          ) : mostrarReportePipeLine ? null : (
            <p className="lead h3 text-uppercase text-primary">
              Por favor seleccione una ficha para trabajar "Ver Lista de
              Materiales"
            </p>
          )}
          {mostrarReportePipeLine && (
            <ReportePipeLine
              setMostrarReportePipeLine={setMostrarReportePipeLine}
            />
          )}
        </div>

        <div className="col-12 col-xl-4">
          <p className="h3 text-uppercase">Lista de Fichas </p>
          <button
            className="w-100 btn btn-warning text-uppercase mb-3 fw-bolder"
            onClick={() => mostrarReportePipeline()}
          >
            Reporte Pipeline
          </button>
          <ListaFichasBackOffice
            setMostrartabla={setMostrartabla}
            mostrartabla={mostrartabla}
            fichasBackOffice={fichasBackOffice}
            setMostrarReportePipeLine={setMostrarReportePipeLine}
          />
        </div>
      </div>
    </div>
  );
}

export default SesionBackOffice;
