import React from "react";
import { Download, Share2 } from "lucide-react";
import { ReceiptData } from "@/types";

interface PDFGeneratorProps {
  data: ReceiptData;
}

export const PDFGenerator: React.FC<PDFGeneratorProps> = ({ data }) => {
  // Por ahora vamos a implementar una versión simple sin react-pdf
  // para que funcione el build
  const handleDownload = () => {
    // Crear contenido HTML del comprobante
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Comprobante de Pago - ${data.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { background: #0056D3; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .row { margin: 10px 0; }
          .label { font-weight: bold; color: #666; }
          .amount { background: #f5f5f5; padding: 15px; text-align: center; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>COMPROBANTE DE PAGO</h1>
          <p>CourseraClone Academy</p>
        </div>
        <div class="content">
          <div class="row"><span class="label">Nº Comprobante:</span> COMP-${data.id
            .toString()
            .padStart(3, "0")}</div>
          <div class="row"><span class="label">Estudiante:</span> ${
            data.student
          }</div>
          <div class="row"><span class="label">ID Estudiante:</span> ${
            data.studentId
          }</div>
          <div class="row"><span class="label">Curso:</span> ${
            data.course
          }</div>
          <div class="row"><span class="label">Tipo:</span> ${
            data.courseType === "course"
              ? "Curso Individual"
              : "Especialización"
          }</div>
          <div class="row"><span class="label">Fecha:</span> ${data.date}</div>
          <div class="row"><span class="label">ID Actividad:</span> ${
            data.activityId
          }</div>
          <div class="amount">
            <div class="label">MONTO TOTAL</div>
            <div style="font-size: 24px; color: #0056D3; font-weight: bold;">S/ ${data.amount.toFixed(
              2
            )}</div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Crear blob y descargar
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comprobante-${data.id}-${data.student
      .replace(/\s+/g, "-")
      .toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Comprobante de Pago - ${data.course}`,
          text: `Comprobante de pago para el curso: ${data.course}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copiar URL al portapapeles
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("URL copiada al portapapeles");
      } catch (error) {
        console.log("Error copying to clipboard:", error);
      }
    }
  };

  return (
    <div className="mt-6 space-y-3">
      <button
        onClick={handleDownload}
        className="btn-primary w-full flex items-center justify-center space-x-2"
      >
        <Download size={20} />
        <span>Descargar Comprobante</span>
      </button>

      <button
        onClick={handleShare}
        className="btn-secondary w-full flex items-center justify-center space-x-2"
      >
        <Share2 size={20} />
        <span>Compartir</span>
      </button>
    </div>
  );
};
