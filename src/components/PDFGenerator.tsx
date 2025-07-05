import React, { useRef, useState } from "react";
import { Download, Share2, Loader2 } from "lucide-react";
import { ReceiptData } from "@/types";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { formatDate, formatAmount } from "@/utils/dataParser";

interface PDFGeneratorProps {
  data: ReceiptData;
}

export const PDFGenerator: React.FC<PDFGeneratorProps> = ({ data }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    setIsGenerating(true);
    try {
      // Configurar opciones para html2canvas
      const canvas = await html2canvas(printRef.current, {
        scale: 2, // Mayor resolución
        useCORS: true,
        backgroundColor: "#ffffff",
        width: printRef.current.offsetWidth,
        height: printRef.current.offsetHeight,
      });

      // Crear PDF con jsPDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calcular dimensiones para ajustar al A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10; // Margen superior

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      // Descargar el PDF
      const fileName = `comprobante-${data.id}-${data.student
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-_]/g, "")
        .toLowerCase()}.pdf`;

      pdf.save(fileName);
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Error al generar el PDF. Intenta nuevamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadHTML = () => {
    // Crear contenido HTML del comprobante como fallback
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Comprobante de Pago - ${data.id}</title>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 20px; 
            margin: 0;
            background: #f5f5f5;
          }
          .receipt {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header { 
            background: #0056D3; 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
          }
          .header h1 { margin: 0 0 10px 0; font-size: 28px; }
          .header p { margin: 0; opacity: 0.9; }
          .content { padding: 30px; }
          .row { 
            display: flex; 
            justify-content: space-between; 
            margin: 15px 0; 
            padding: 10px 0;
            border-bottom: 1px solid #eee;
          }
          .label { font-weight: bold; color: #666; }
          .value { color: #333; }
          .amount { 
            background: #f8f9fa; 
            padding: 20px; 
            text-align: center; 
            margin: 30px 0; 
            border-radius: 8px;
            border-left: 4px solid #0056D3;
          }
          .amount .total { font-size: 32px; color: #0056D3; font-weight: bold; }
          .footer { 
            text-align: center; 
            padding: 20px; 
            background: #f8f9fa; 
            color: #666; 
            font-size: 14px; 
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <h1>📄 COMPROBANTE DE PAGO</h1>
            <p>${data.company}</p>
          </div>
          <div class="content">
            <div class="row">
              <span class="label">Nº de Comprobante</span>
              <span class="value">COMP-${data.id
                .toString()
                .padStart(5, "0")}</span>
            </div>
            <div class="row">
              <span class="label">Estudiante</span>
              <span class="value">${data.student}</span>
            </div>
            <div class="row">
              <span class="label">ID Estudiante</span>
              <span class="value">${data.studentId}</span>
            </div>
            <div class="row">
              <span class="label">Curso</span>
              <span class="value">${data.course}</span>
            </div>
            <div class="row">
              <span class="label">Tipo</span>
              <span class="value">${
                data.courseType === "course"
                  ? "Curso Individual"
                  : "Especialización"
              }</span>
            </div>
            <div class="row">
              <span class="label">Fecha de Pago</span>
              <span class="value">${formatDate(data.date)}</span>
            </div>
            <div class="row">
              <span class="label">ID Actividad</span>
              <span class="value">${data.activityId}</span>
            </div>
            <div class="amount">
              <div class="label">MONTO PAGADO</div>
              <div class="total">${formatAmount(data.amount)}</div>
              <div style="margin-top: 10px; font-size: 14px;">Procesado exitosamente</div>
            </div>
          </div>
          <div class="footer">
            <p>Este comprobante es válido y verificable</p>
            <p>Actividad ID: ${
              data.activityId
            } | Generado: ${new Date().toLocaleDateString("es-ES")}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Crear blob y descargar
    const blob = new Blob([htmlContent], { type: "text/html; charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comprobante-${data.id}-${data.student
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "")
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
    <>
      {/* Elemento oculto para captura del PDF */}
      <div
        ref={printRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "600px",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#0056D3",
              color: "white",
              padding: "30px 20px",
              textAlign: "center",
            }}
          >
            <h1 style={{ margin: "0 0 10px 0", fontSize: "28px" }}>
              📄 COMPROBANTE DE PAGO
            </h1>
            <p style={{ margin: "0", opacity: "0.9" }}>{data.company}</p>
          </div>

          {/* Content */}
          <div style={{ padding: "30px" }}>
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "15px 0",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span style={{ fontWeight: "bold", color: "#666" }}>
                  Nº de Comprobante
                </span>
                <span>COMP-{data.id.toString().padStart(5, "0")}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "15px 0",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span style={{ fontWeight: "bold", color: "#666" }}>
                  Estudiante
                </span>
                <span>{data.student}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "15px 0",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span style={{ fontWeight: "bold", color: "#666" }}>Curso</span>
                <span>{data.course}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "15px 0",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span style={{ fontWeight: "bold", color: "#666" }}>
                  Fecha de Pago
                </span>
                <span>{formatDate(data.date)}</span>
              </div>
            </div>

            {/* Amount */}
            <div
              style={{
                background: "#f8f9fa",
                padding: "20px",
                textAlign: "center",
                margin: "30px 0",
                borderRadius: "8px",
                borderLeft: "4px solid #0056D3",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  color: "#666",
                  marginBottom: "10px",
                }}
              >
                MONTO PAGADO
              </div>
              <div
                style={{
                  fontSize: "32px",
                  color: "#0056D3",
                  fontWeight: "bold",
                }}
              >
                {formatAmount(data.amount)}
              </div>
              <div style={{ marginTop: "10px", fontSize: "14px" }}>
                Procesado exitosamente
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              background: "#f8f9fa",
              color: "#666",
              fontSize: "14px",
            }}
          >
            <p style={{ margin: "0 0 5px 0" }}>
              Este comprobante es válido y verificable
            </p>
            <p style={{ margin: "0" }}>
              Actividad ID: {data.activityId} | Generado:{" "}
              {new Date().toLocaleDateString("es-ES")}
            </p>
          </div>
        </div>
      </div>

      {/* Botones de descarga */}
      <div className="mt-6 space-y-3">
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Generando PDF...</span>
            </>
          ) : (
            <>
              <Download size={20} />
              <span>Descargar PDF</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownloadHTML}
          className="btn-secondary w-full flex items-center justify-center space-x-2"
        >
          <Download size={20} />
          <span>Descargar HTML</span>
        </button>

        <button
          onClick={handleShare}
          className="btn-secondary w-full flex items-center justify-center space-x-2"
        >
          <Share2 size={20} />
          <span>Compartir</span>
        </button>
      </div>
    </>
  );
};
