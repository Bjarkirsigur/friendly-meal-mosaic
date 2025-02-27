
import { useRef } from "react";

type BarcodeScannerProps = {
  onDetected: (code: string) => void;
  onError?: (error: any) => void;
};

const BarcodeScanner = ({ onDetected, onError }: BarcodeScannerProps) => {
  const scannerRef = useRef<HTMLDivElement>(null);

  // Simple placeholder for future barcode scanner implementation
  return (
    <div className="relative overflow-hidden rounded-md">
      <div ref={scannerRef} className="w-full h-full min-h-[240px] bg-secondary/20 flex items-center justify-center">
        <p className="text-muted-foreground">Barcode scanning feature coming soon</p>
      </div>
      <div className="absolute inset-0 border-2 border-dashed border-primary/60 rounded-md pointer-events-none z-10"></div>
    </div>
  );
};

export default BarcodeScanner;
