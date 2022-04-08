import React from "react";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import RegisterView from "./RegisterView";

function AdministradorView() {
  /* useEffect(() => {
    
  }, []) */
  return (
    <div>
      <NavBar />
      <RegisterView />
    </div>
  );
}

export default AdministradorView;
