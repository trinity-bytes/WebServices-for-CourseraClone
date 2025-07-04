import React, { useEffect, useState } from "react";
import { ReceiptViewer } from "@/components/ReceiptViewer";
import { PDFGenerator } from "@/components/PDFGenerator";
import { ErrorPage } from "@/components/ErrorPage";
import { parseURLPayload, validateReceiptData } from "@/utils/dataParser";
import { ReceiptData } from "@/types";
import { Loader2 } from "lucide-react";

export const VerifyPage: React.FC = () => {
  const [data, setData] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsedData = parseURLPayload();

      if (!parsedData) {
        setError("No se encontraron datos en la URL");
        setLoading(false);
        return;
      }

      if (!validateReceiptData(parsedData)) {
        setError("Los datos del documento no son válidos");
        setLoading(false);
        return;
      }

      setData(parsedData);
      setLoading(false);
    } catch (err) {
      console.error("Error parsing data:", err);
      setError("Error al procesar los datos del documento");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2
            className="mx-auto mb-4 animate-spin text-coursera-blue"
            size={48}
          />
          <p className="text-gray-600">Verificando documento...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <ErrorPage message={error || "Error desconocido"} />;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-md">
        <ReceiptViewer data={data} />
        <PDFGenerator data={data} />
      </div>
    </div>
  );
};
