import React from "react";
import { Outlet } from "react-router-dom";

export function Form() {
  return (
    <div>
      <h1>Form</h1>
      <Outlet />
    </div>
  );
}
