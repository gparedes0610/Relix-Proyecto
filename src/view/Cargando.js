import React from "react";
import Spinner from "react-bootstrap/Spinner";
function Cargando() {
  return (
    <div className="container text-center">
      <Spinner animation="border" variant="primary" />
      <Spinner animation="border" variant="secondary" />
      <Spinner animation="border" variant="success" />
    </div>
  );
}

export default Cargando;
