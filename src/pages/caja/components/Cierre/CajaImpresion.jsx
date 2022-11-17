// Modulos.
import React from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/material";

export function CajaImpresion(props) {
  const componentRef = props.referencia;
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Button
        onClick={() => {
          props.handleConfirmacion();
          props.generarBoleta();
          setTimeout(() => {
            handlePrint();
          }, 5000);
          
        }}
        variant="contained"
      >
        Aceptar
      </Button>
    </>
  );
}
