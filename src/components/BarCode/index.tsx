import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

function BarCode({
  productNR,
  width = 3,
  height = 100,
  textVisible
}: {
  productNR: string;
  width?: number;
  height?: number;
  textVisible?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      JsBarcode(canvasRef.current, productNR, {
        format: 'CODE128',
        displayValue: textVisible ? true : false,
        text: productNR,
        width,
        height
      });
    }
  }, [productNR]);

  return <canvas ref={canvasRef} width={100} height={50}></canvas>;
}

export default BarCode;
