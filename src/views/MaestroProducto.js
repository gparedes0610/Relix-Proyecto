import React from "react";
import NavBar from ".././views/NavBar";

function MaestroProducto() {
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <input type="file" className="form-control" />
          <div className="col-12">
            <h3>aqui va tabla</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default MaestroProducto;
