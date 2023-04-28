import React from "react";
import Navbar from "../../view/Navbar";
import Sidebar from "../../view/Sidebar";

function LayoutPrincipal(props) {
  return (
    <>
      <Sidebar/>
      {/* <Navbar /> */}
      <div style={{ marginBottom: "0px" }} ></div>
      {props.children}
    </>
  );
}

export default LayoutPrincipal;
