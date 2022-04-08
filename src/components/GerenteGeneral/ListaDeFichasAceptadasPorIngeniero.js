import React, { useEffect, useState } from "react";
import { obtenerFichasAceptadas } from "./apisGerenteGeneral";
import FichaAceptadaIngeniero from "./FichaAceptadaIngeniero";

function ListaDeFichasAceptadasPorIngeniero({
  mostrartabla,
  setMostrartabla,
  fichasAceptadas,
}) {
  const [cambiarColor, setCambiarColor] = useState(false);

  return (
    <ul className="list-group cambiarcolores">
      {fichasAceptadas.length >= 0 ? (
        fichasAceptadas.map((fichaAceptada, i) => (
          <FichaAceptadaIngeniero
            fichaAceptada={fichaAceptada}
            key={i}
            mostrartabla={mostrartabla}
            setMostrartabla={setMostrartabla}
            cambiarColor={cambiarColor}
            setCambiarColor={setCambiarColor}
            i={i}
          />
        ))
      ) : (
        <p className="text-danger lead">No existe fichas tecnicas aceptadas</p>
      )}
    </ul>
  );
}

export default ListaDeFichasAceptadasPorIngeniero;
