import React, { useContext, useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import tablaContext from "../../context/tabla/tablaContext";
import fichaTecnicaContext from "../../context/fichaTecnica/fichaTecnicaContext";
import ListaDeFichasAceptadasPorIngeniero from "../GerenteGeneral/ListaDeFichasAceptadasPorIngeniero";
import { obtenerFichasAceptadas } from "../GerenteGeneral/apisGerenteGeneral";

function SesionGerenteAdministracion() {
  const [mostrartabla, setMostrartabla] = useState(false);
  const [botonActivo, setBotonActivo] = useState(true);
  //////////////////////
  const tablacontext = useContext(tablaContext);
  const {
    altaNegocioGerenteAdministracion,
    tablaDatosGerenteGeneral,
    rptaAltaNegocioAdministracion,
    rptaAltaNegocio,
  } = tablacontext;
  ////////////////////////
  ///////////////////////////////
  const fichatecnicacontext = useContext(fichaTecnicaContext);
  const { fichaTecnica, obtenerTodasLasFichasTecnicas } = fichatecnicacontext;
  //////////////////////////////
  const [fichasAceptadas, setFichasAceptadas] = useState([]); //aqui se guarda las fichas aceptadas

  const getData = async () => {
    const obteniendoFichasAceptadas = await obtenerFichasAceptadas();
    try {
      setFichasAceptadas(obteniendoFichasAceptadas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    obtenerTodasLasFichasTecnicas();
    obtenerFichasAceptadas();
  }, [rptaAltaNegocioAdministracion, fichaTecnica, rptaAltaNegocio]);

  /* COLUMNAS */
  const columns = [
    {
      headerName: "Partida",
      field: "partidaDetallefichatecnica",
      filter: true,
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
  ];
  /* COLUMNAS */
  const defaultColDef = {
    /* filter: true, */
    /*  filter: true,
    floatingFilter: true, */
    //editable: true,
    resizable: true,
  };
  const confirmarAlta = () => {
    console.log(
      "hiciste click en confirmarAlta",
      "este es el id",
      fichaTecnica[0].idFichatecnica
    );
    altaNegocioGerenteAdministracion(fichaTecnica[0].idFichatecnica, 1);
    setBotonActivo(false);
    // guardarCotizacion(fichaTecnica[0].idFichatecnica); //mando ID DE LA FICHA TECNICA
    setTimeout(() => {
      setBotonActivo(true);
    }, 6500);
  };
  const denegarAlta = () => {
    console.log("hiciste click en denegarAlta");
    altaNegocioGerenteAdministracion(fichaTecnica[0].idFichatecnica, 2);
    setFichasAceptadas(
      fichasAceptadas.filter(
        (ficha) => ficha.idFichatecnica !== fichaTecnica[0].idFichatecnica
      )
    );
    setMostrartabla(false);
  };
  return (
    <div className="container-fluid">
      <h3 className="text-success text-uppercase">
        Bienvenido Gerente de administracion
      </h3>
      <ul>
        <li className="lead">
          Por Favor Revisar Las Fichas tecnicas con sus respectivos descuentos.
        </li>
        <li className="lead">Aceptar o denegar segun corresponda.</li>
        <li className="lead">Hacer click en "Ver Lista de Materiales"</li>
      </ul>

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
              {fichaTecnica &&
                (fichaTecnica[0].aprobaciongerenteadministracionFichatecnica ==
                  "1" || rptaAltaNegocioAdministracion === 1 ? (
                  <p className="text-uppercase text-success fw-bolder">
                    Alta de Negocio confirmado
                  </p>
                ) : fichaTecnica[0]
                    .aprobaciongerenteadministracionFichatecnica == "2" ||
                  rptaAltaNegocioAdministracion === 2 ? (
                  <p className="text-uppercase text-danger fw-bolder">
                    Alta de Negocio Denegado
                  </p>
                ) : (
                  <div>
                    <button
                      className="btn btn-success mb-3 me-4"
                      onClick={() => confirmarAlta()}
                      disabled={!botonActivo}
                    >
                      Confirmar Alta de Negocio
                    </button>
                    <button
                      className="btn btn-danger mb-3 me-4"
                      onClick={() => denegarAlta()}
                      disabled={!botonActivo}
                    >
                      Denegar Alta de Negocio
                    </button>
                  </div>
                ))}

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
                    // autoGroupColumnDef={autoGroupColumnDef}
                    //  suppressRowClickSelection={true}
                    //rowSelection={"multiple"}
                    //onGridReady={onGridReady}
                    // rowSelection={rowSelectionType}
                    //rowSelection={rowSelectionType} //selecciona una fila
                    // onSelectionChanged={onSelectionChanged} //selecciona varias filas con control
                    //rowMultiSelectWithClick={true}
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="lead h3 text-uppercase text-primary">
              Por favor seleccione una ficha para trabajar "Ver Lista de
              Materiales"
            </p>
          )}
        </div>
        <div className="col-12 col-xl-4">
          <p className="h3 text-uppercase">Lista de Fichas </p>
          <ListaDeFichasAceptadasPorIngeniero
            setMostrartabla={setMostrartabla}
            mostrartabla={mostrartabla}
            fichasAceptadas={fichasAceptadas}
          />
        </div>
      </div>
    </div>
  );
}

export default SesionGerenteAdministracion;
