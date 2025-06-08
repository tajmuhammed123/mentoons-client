import React from "react";
import { Outlet } from "react-router-dom";
import { ComplexNavbar } from "../Navbar";

function LayOut() {
  console.log("reacged");
  return (
    <>
      <div className="main">
        <div className="content">
          <ComplexNavbar className="sticky" />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default LayOut;
