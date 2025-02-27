
import { useEffect, useRef } from "react";
import Quagga from "quagga2";

type BarcodeScannerProps = {
  onDetected: (code: string) => void;
  onError?: (error: any) => void;
};

const BarcodeScanner = ({ onDetected, onError }: BarcodeScannerProps) => {
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const startScanner = async () => {
      try {
        await Quagga.init({
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerRef.current,
            constraints: {
              width: 320,
              height: 240,
              facingMode: "environment" // Use the back camera
            },
          },
          decoder: {
            readers: [
              "ean_reader",
              "ean_8_reader",
              "upc_reader",
              "upc_e_reader",
              "code_128_reader",
            ]
          },
        });

        Quagga.start();

        Quagga.onDetected((result) => {
          if (result && result.codeResult && result.codeResult.code) {
            onDetected(result.codeResult.code);
          }
        });
      } catch (err) {
        if (onError) onError(err);
        console.error("Error starting barcode scanner:", err);
      }
    };

    startScanner();

    return () => {
      Quagga.stop();
    };
  }, [onDetected, onError]);

  return (
    <div className="relative overflow-hidden rounded-md">
      <div ref={scannerRef} className="w-full h-full" />
      <div className="absolute inset-0 border-2 border-dashed border-primary/60 rounded-md pointer-events-none z-10"></div>
    </div>
  );
};

export default BarcodeScanner;
