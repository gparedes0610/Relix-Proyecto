import React, { useRef, useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

import * as XLSX from "xlsx";
import {
  registroProductos,
  registroProducto,
} from "../services/apiMaestroProducto/maestroProductoService";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

function MaestroProducto() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const ref = useRef();
  const reset = () => {
    ref.current.value = "";
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const btnAgregarProducto = () => {
    console.log("hizo click en agregar producto");
    setShowModal(true);
  };

  const [archivoExcel, setArchivoExcel] = useState(null);
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
      console.log("objetos del excel", items);
      registroProductos(items);
      reset();
      setArchivoExcel(null);
    });
  };

  const regresar = () => {
    navigate("/sesioniniciada");
  };

  ///AGREGAR MANUALMENTE

  const [nuevoProducto, setNuevoProducto] = useState({
    codigosoftcomProducto: "",
    descripcionProducto: "",
    codigoreferenciaProducto: "",
    undProducto: "",
    marcaProducto: "",
    costodisenoProducto: "",
    familiaProducto: "",
    precioventaunoProducto: "",
    precioventadosProducto: "",
    precioventatresProducto: "",
    precioventacuatroProducto: "",
  });
  const {
    codigosoftcomProducto,
    descripcionProducto,
    codigoreferenciaProducto,
    undProducto,
    marcaProducto,
    costodisenoProducto,
    familiaProducto,
    precioventaunoProducto,
    precioventadosProducto,
    precioventatresProducto,
    precioventacuatroProducto,
  } = nuevoProducto;

  const agarrarInput = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("funciona");
    registroProducto(nuevoProducto);

    Swal.fire(
      "Buen trabajo",
      "Actualizacion exitosa, revise por favor",
      "success"
    );
  };
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-5">
            <input
              className="form-control"
              type="file"
              id="formFile"
              ref={ref}
              onChange={(e) => {
                const file = e.target.files[0];
                setArchivoExcel(file);
                readExcel(file);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <Button
              className="btn btn-success my-3"
              onClick={() => btnAgregarProducto()}
            >
              Agregar Manualmente
            </Button>
            <Button className="btn btn-warning mx-3" onClick={() => regresar()}>
              Regresar
            </Button>
          </div>
        </div>

        <Modal
          size="lg"
          show={showModal}
          onHide={handleClose}
          centered
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Agrege Producto Manualmente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={12}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label className="text-uppercase">
                      Ingrese Codigo:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Ingrese Codigo"
                      name="codigosoftcomProducto"
                      value={codigosoftcomProducto}
                      onChange={(e) => agarrarInput(e)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label className="text-uppercase">
                      Descripcion:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Descripcion"
                      name="descripcionProducto"
                      value={descripcionProducto}
                      onChange={(e) => agarrarInput(e)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label className="text-uppercase">
                      Codigo Referencia:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Codigo Referencia"
                      name="codigoreferenciaProducto"
                      value={codigoreferenciaProducto}
                      onChange={(e) => agarrarInput(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label className="text-uppercase">UND:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="UND"
                      name="undProducto"
                      value={undProducto}
                      onChange={(e) => agarrarInput(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label className="text-uppercase">
                      Precio Venta 01:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Precio Venta 01"
                      name="precioventaunoProducto"
                      value={precioventaunoProducto}
                      onChange={(e) => agarrarInput(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label className="text-uppercase">
                      Precio Venta 02:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Precio Venta 02"
                      name="precioventadosProducto"
                      value={precioventadosProducto}
                      onChange={(e) => agarrarInput(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label className="text-uppercase">
                      Precio Venta 03:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Precio Venta 03"
                      name="precioventatresProducto"
                      value={precioventatresProducto}
                      onChange={(e) => agarrarInput(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label className="text-uppercase">
                      Precio Venta 04:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Precio Venta 04"
                      name="precioventacuatroProducto"
                      value={precioventacuatroProducto}
                      onChange={(e) => agarrarInput(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label className="text-uppercase">
                      Costo de diseño:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Costo de diseño"
                      name="costodisenoProducto"
                      value={costodisenoProducto}
                      onChange={(e) => agarrarInput(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label className="text-uppercase">Familia:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Familia"
                      name="familiaProducto"
                      value={familiaProducto}
                      onChange={(e) => agarrarInput(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label className="text-uppercase">Marca:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Marca"
                      name="marcaProducto"
                      value={marcaProducto}
                      onChange={(e) => agarrarInput(e)}
                    />
                  </Form.Group>
                  <Button className="btn btn-success mt-3" type="submit">
                    Guardar
                  </Button>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default MaestroProducto;
