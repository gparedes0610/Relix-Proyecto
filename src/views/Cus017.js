import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
function Cus017() {
  const data = [
    {
      g12tempo: "g12tempo1",
      presupuesto: "presupuesto1",
      totalprecio: "totalprecio1",
      estado: "estado1",
      crearfactura: "crearfactura1",
    },
    {
      g12tempo: "g12tempo1",
      presupuesto: "presupuesto1",
      totalprecio: "totalprecio1",
      estado: "estado1",
      crearfactura: "crearfactura1",
    },
    {
      g12tempo: "g12tempo1",
      presupuesto: "presupuesto1",
      totalprecio: "totalprecio1",
      estado: "estado1",
      crearfactura: "crearfactura1",
    },
    {
      g12tempo: "g12tempo1",
      presupuesto: "presupuesto1",
      totalprecio: "totalprecio1",
      estado: "estado1",
      crearfactura: "crearfactura1",
    },
  ];

  const columns = [
    {
      headerName: "G12Tempo",
      field: "g12tempo",
    },
    {
      headerName: "Presupuesto",
      field: "presupuesto",
    },
    {
      headerName: "Total Precio",
      field: "totalprecio",
    },
    {
      headerName: "Estado",
      field: "estado",
    },
    {
      headerName: "Crear Factura",
      field: "crearfactura",
    },
    {
      headerName: "Acciones",
      field: "",

      cellRendererFramework: (params) => (
        <div>
          <input type="checkbox" className="ms-3" />
        </div>
      ),
    },
  ];
  const defaultColDef = {
    /* filter: true, */
    /*  filter: true,
                floatingFilter: true, */
    editable: true,
    flex: 1,
  };
  return (
    <div className="container mt-4">
      <div
        id="myGrid"
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%" }}
      >
        <AgGridReact
          rowData={data}
          columnDefs={columns}
          defaultColDef={defaultColDef}
        />
      </div>

      <div className="row mt-5 mb-4">
        <div className="col-12 col-md-6 text-end"></div>
        <div className="col-12 col-md-6 text-end">
          <button
            style={{
              background: "#3BBA00",
              border: "none",
              color: "white ",
              padding: "8px 16px",
            }}
            className="ms-3"
          >
            Asignar
          </button>
          <button
            style={{
              background: "#3BBA00",
              border: "none",
              color: "white ",
              padding: "8px 16px",
            }}
            className="ms-3"
          >
            Factura
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cus017;
