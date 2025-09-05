import React, { useRef, useState } from "react";
import { Download, Share2, Loader2 } from "lucide-react";
import { CertificateData } from "@/types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { formatDate } from "@/utils/dataParser";

interface CertificatePDFGeneratorProps {
  data: CertificateData;
}

export const CertificatePDFGenerator: React.FC<
  CertificatePDFGeneratorProps
> = ({ data }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      if (!printRef.current) {
        throw new Error("No se encontró el contenedor para imprimir");
      }

      // Capturar DOM en alta resolución
      const canvas = await html2canvas(printRef.current, {
        scale: Math.max(2, window.devicePixelRatio || 1),
        useCORS: true,
        backgroundColor: "#ffffff",
        width: printRef.current.offsetWidth,
        height: printRef.current.offsetHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      const fileName = `certificado-${data.id}-${data.student
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-_]/g, "")
        .toLowerCase()}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generando PDF del certificado:", error);
      alert("Error al generar el PDF. Intenta nuevamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadHTML = () => {
    // Crear contenido HTML del certificado
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Certificado - ${data.student}</title>
        <meta charset="UTF-8">
        <style>
          @page { size: A4 landscape; margin: 20mm; }
          body { 
            font-family: Arial, sans-serif; 
            padding: 0; 
            margin: 0;
            background: #f5f5f5;
            line-height: 1.5;
          }
          .certificate {
            max-width: 100%;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            border: 3px solid #0056D3;
          }
          .header { 
            background: linear-gradient(135deg, #0056D3 0%, #1e40af 100%);
            color: white; 
            padding: 40px 20px; 
            text-align: center; 
            position: relative;
          }
          .header::before {
            content: '🏆';
            position: absolute;
            top: 20px;
            left: 30px;
            font-size: 48px;
            opacity: 0.3;
          }
          .header::after {
            content: '🎓';
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 48px;
            opacity: 0.3;
          }
          .header h1 { 
            margin: 0 0 10px 0; 
            font-size: 36px; 
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }
          .header p { margin: 0; opacity: 0.9; font-size: 18px; }
          .content { padding: 40px; }
          .cert-number {
            text-align: center;
            margin-bottom: 30px;
          }
          .cert-number span {
            background: #f0f7ff;
            border: 2px solid #0056D3;
            color: #0056D3;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: bold;
            font-size: 18px;
          }
          .main-text {
            text-align: center;
            margin-bottom: 40px;
          }
          .main-text .intro { 
            font-size: 24px; 
            color: #666; 
            margin-bottom: 20px; 
          }
          .student-name { 
            font-size: 48px; 
            font-weight: bold; 
            color: #333; 
            margin: 20px 0;
            border-bottom: 4px solid #0056D3;
            display: inline-block;
            padding-bottom: 10px;
          }
          .course-title { 
            font-size: 28px; 
            color: #0056D3; 
            font-weight: 600;
            margin-top: 20px;
          }
          .details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
          }
          .detail-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #0056D3;
          }
          .detail-label { 
            font-weight: bold; 
            color: #666; 
            font-size: 14px;
            margin-bottom: 5px;
          }
          .detail-value { 
            color: #333; 
            font-size: 18px; 
            font-weight: 500;
          }
          .grade-box {
            background: #f0fdf4 !important;
            border-left-color: #16a34a !important;
          }
          .grade-box .detail-label { color: #16a34a; }
          .grade-box .detail-value { color: #15803d; font-weight: bold; }
          .signature-section {
            border-top: 2px solid #e5e7eb;
            padding-top: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .verified {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #16a34a;
            font-weight: 600;
            font-size: 16px;
          }
          .authority {
            text-align: right;
          }
          .authority .org-name {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
          }
          .authority .org-title {
            color: #666;
            font-size: 14px;
          }
          .footer { 
            background: #f8f9fa; 
            padding: 20px; 
            text-align: center; 
            color: #666; 
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
          }
          .print-only { display: none; }
          @media print {
            .print-only { display: block; }
            body { background: white; }
            .certificate { box-shadow: none; border: none; }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <h1>CERTIFICADO DE FINALIZACIÓN</h1>
            <p>${data.organization}</p>
          </div>
          
          <div class="content">
            <div class="cert-number">
              <span>Certificado Nº CERT-${data.id
                .toString()
                .padStart(5, "0")}</span>
            </div>
            
            <div class="main-text">
              <p class="intro">Se certifica que</p>
              <div class="student-name">${data.student}</div>
              <p class="intro">ha completado exitosamente el curso</p>
              <div class="course-title">${data.course}</div>
            </div>
            
            <div class="details">
              <div class="detail-box">
                <div class="detail-label">Estudiante</div>
                <div class="detail-value">${data.student}</div>
                <div style="font-size: 12px; color: #999; margin-top: 5px;">ID: ${
                  data.studentId
                }</div>
              </div>
              
              <div class="detail-box">
                <div class="detail-label">Fecha de Finalización</div>
                <div class="detail-value">${formatDate(
                  data.completionDate
                )}</div>
              </div>
              
              <div class="detail-box">
                <div class="detail-label">Fecha de Emisión</div>
                <div class="detail-value">${formatDate(data.issueDate)}</div>
              </div>
              
              ${
                data.duration
                  ? `
              <div class="detail-box">
                <div class="detail-label">Duración</div>
                <div class="detail-value">${data.duration}</div>
              </div>
              `
                  : ""
              }
              
              ${
                data.grade
                  ? `
              <div class="detail-box grade-box">
                <div class="detail-label">Calificación</div>
                <div class="detail-value">${data.grade}</div>
              </div>
              `
                  : ""
              }
            </div>
            
            <div class="signature-section">
              <div class="verified">
                <span>🛡️</span>
                <span>Certificado Verificado</span>
              </div>
              
              <div class="authority">
                <div class="org-name">${data.organization}</div>
                <div class="org-title">Autoridad Certificadora</div>
                <div style="font-size: 12px; color: #999; margin-top: 5px;">
                  Actividad ID: ${data.activityId}
                </div>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>
              Este certificado es válido y verificable. Para validar su autenticidad, 
              escanee el código QR o visite nuestro sitio web oficial.
            </p>
            <p style="margin-top: 10px;">
              Emitido electrónicamente por ${
                data.organization
              } • Certificado ID: ${data.id} • ${new Date().toLocaleDateString(
      "es-ES"
    )}
            </p>
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
    a.download = `certificado-${data.id}-${data.student
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
          title: `Certificado - ${data.student}`,
          text: `Certificado de finalización del curso: ${data.course}`,
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
      {/* Elemento oculto para captura del PDF (A4 landscape ~ 1.414 ratio) */}
      <div
        ref={printRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "1754px", // ~ A4 landscape at moderate pixel size
          height: "1240px",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            overflow: "hidden",
            border: "3px solid #0056D3",
            boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #0056D3 0%, #1e40af 100%)",
              color: "#ffffff",
              padding: "32px 24px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <h1 style={{ margin: 0, fontSize: 36, fontWeight: 700 }}>
              CERTIFICADO DE FINALIZACIÓN
            </h1>
            <p style={{ margin: "6px 0 0 0", opacity: 0.9, fontSize: 18 }}>
              {data.organization}
            </p>
          </div>

          {/* Content */}
          <div style={{ padding: 32, flex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <span
                style={{
                  background: "#f0f7ff",
                  border: "2px solid #0056D3",
                  color: "#0056D3",
                  padding: "10px 18px",
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                Certificado Nº CERT-{data.id.toString().padStart(5, "0")}
              </span>
            </div>

            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <p style={{ fontSize: 22, color: "#666", margin: "0 0 12px" }}>
                Se certifica que
              </p>
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: "#1f2937",
                  display: "inline-block",
                  paddingBottom: 8,
                  borderBottom: "4px solid #0056D3",
                }}
              >
                {data.student}
              </div>
              <p style={{ fontSize: 20, color: "#666", margin: "14px 0 0" }}>
                ha completado exitosamente el curso
              </p>
              <div
                style={{
                  fontSize: 26,
                  color: "#0056D3",
                  fontWeight: 700,
                  marginTop: 10,
                }}
              >
                {data.course}
              </div>
            </div>

            {/* Details Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  background: "#f8f9fa",
                  borderLeft: "5px solid #0056D3",
                  borderRadius: 10,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: "#666",
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  Estudiante
                </div>
                <div
                  style={{ color: "#111827", fontSize: 16, fontWeight: 600 }}
                >
                  {data.student}
                </div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
                  ID: {data.studentId}
                </div>
              </div>

              <div
                style={{
                  background: "#f8f9fa",
                  borderLeft: "5px solid #0056D3",
                  borderRadius: 10,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: "#666",
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  Fecha de Finalización
                </div>
                <div
                  style={{ color: "#111827", fontSize: 16, fontWeight: 600 }}
                >
                  {formatDate(data.completionDate)}
                </div>
              </div>

              <div
                style={{
                  background: "#f8f9fa",
                  borderLeft: "5px solid #0056D3",
                  borderRadius: 10,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: "#666",
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  Fecha de Emisión
                </div>
                <div
                  style={{ color: "#111827", fontSize: 16, fontWeight: 600 }}
                >
                  {formatDate(data.issueDate)}
                </div>
              </div>

              {data.duration && (
                <div
                  style={{
                    background: "#f8f9fa",
                    borderLeft: "5px solid #0056D3",
                    borderRadius: 10,
                    padding: 16,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#666",
                      fontSize: 12,
                      marginBottom: 4,
                    }}
                  >
                    Duración
                  </div>
                  <div
                    style={{ color: "#111827", fontSize: 16, fontWeight: 600 }}
                  >
                    {data.duration}
                  </div>
                </div>
              )}

              {data.grade && (
                <div
                  style={{
                    background: "#f0fdf4",
                    borderLeft: "5px solid #16a34a",
                    borderRadius: 10,
                    padding: 16,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#16a34a",
                      fontSize: 12,
                      marginBottom: 4,
                    }}
                  >
                    Calificación
                  </div>
                  <div
                    style={{ color: "#15803d", fontSize: 16, fontWeight: 700 }}
                  >
                    {data.grade}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: 16,
                textAlign: "center",
                color: "#6b7280",
                fontSize: 12,
              }}
            >
              <p style={{ margin: 0 }}>
                Este certificado es válido y verificable.
              </p>
              <p style={{ margin: "6px 0 0 0" }}>
                Emitido electrónicamente por {data.organization} • Certificado
                ID: {data.id} • {new Date().toLocaleDateString("es-ES")}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Botones de descarga */}
      <div className="mt-6 space-y-3">
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
          aria-label="Descargar certificado en PDF"
        >
          {isGenerating ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Generando PDF...</span>
            </>
          ) : (
            <>
              <Download size={20} />
              <span>Descargar Certificado PDF</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownloadHTML}
          className="btn-secondary w-full flex items-center justify-center space-x-2"
          aria-label="Descargar certificado en HTML"
        >
          <Download size={20} />
          <span>Descargar HTML</span>
        </button>

        <button
          onClick={handleShare}
          className="btn-secondary w-full flex items-center justify-center space-x-2"
          aria-label="Compartir certificado"
        >
          <Share2 size={20} />
          <span>Compartir Certificado</span>
        </button>
      </div>
    </>
  );
};
