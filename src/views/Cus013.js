import React from "react";
import { AgGridReact } from "ag-grid-react";
import edit from "../assets/edit.svg";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
function Cus013() {
  const data = [
    {
      nrq: "nrq1",
      npedido: "npedido1",
      proyecto: "proyecto1",
      totalprecio: "totalprecio1",
    },
    {
      nrq: "nrq1",
      npedido: "npedido1",
      proyecto: "proyecto1",
      totalprecio: "totalprecio1",
    },
    {
      nrq: "nrq1",
      npedido: "npedido1",
      proyecto: "proyecto1",
      totalprecio: "totalprecio1",
    },
  ];
  const columns = [
    {
      headerName: "N.RQ",
      field: "nrq",
    },
    {
      headerName: "N.Pedido",
      field: "npedido",
    },
    {
      headerName: "proyecto",
      field: "proyecto",
    },
    {
      headerName: "Total Precio",
      field: "totalprecio",
    },
    {
      headerName: "Acciones",
      field: "",

      cellRendererFramework: (params) => (
        <div>
          <button
            style={{
              background: "#56CCF2",
              border: "none",

              borderRadius: "5px",
            }}
          >
            <img
              src={edit}
              alt=""
              className="img-fluid"
              style={{ padding: "0 24px" }}
            />
          </button>
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
    </div>
  );
}

export default Cus013;
