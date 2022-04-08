import React from "react";
import { Form, Button } from "react-bootstrap";

function CambiarContrasena() {
  return (
    <div className="container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Nueva Clave:</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirmar Clave:</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Confirmar
        </Button>
      </Form>
    </div>
  );
}

export default CambiarContrasena;
