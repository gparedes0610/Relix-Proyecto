import React, { useEffect, useState } from "react";
import FichaBackOffice from "./FichaBackOffice";

function ListaFichasBackOffice({
  fichasBackOffice,
  setMostrartabla,
  setMostrarReportePipeLine,
}) {
  const [cambiarColor, setCambiarColor] = useState(false);
  return (
    <ul className="list-group cambiarcolores">
      {fichasBackOffice.length >= 0 ? (
        fichasBackOffice.map((fichaAceptada, i) => (
          <FichaBackOffice
            fichaAceptada={fichaAceptada}
            key={i}
            i={i}
            setCambiarColor={setCambiarColor}
            setMostrartabla={setMostrartabla}
            setMostrarReportePipeLine={setMostrarReportePipeLine}
          />
        ))
      ) : (
        <p className="text-danger lead">No existe fichas tecnicas aceptadas</p>
      )}
    </ul>
  );
}

export default ListaFichasBackOffice;
