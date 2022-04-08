import React from "react";
import Nofunciona from "../assets/404notfound.webp";
export default function NotFound() {
  return (
    <div className="container py-5 d-flex justify-content-center">
      <img src={Nofunciona} alt="" className="w-100" />
    </div>
  );
}
