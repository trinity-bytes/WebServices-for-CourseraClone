import React, { useState } from "react";
import { Download, Share2, Loader2 } from "lucide-react";
import { CertificateData } from "@/types";
import jsPDF from "jspdf";
import { formatDate } from "@/utils/dataParser";

interface CertificatePDFGeneratorProps {
  data: CertificateData;
}

export const CertificatePDFGenerator: React.FC<
  CertificatePDFGeneratorProps
> = ({ data }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      // Crear PDF con jsPDF en formato horizontal para certificados
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      // Configurar colores
      const primaryBlue = [0, 86, 211]; // #0056D3
      const darkBlue = [30, 64, 175]; // #1e40af
      const lightGray = [102, 102, 102]; // #666
      const darkGray = [51, 51, 51]; // #333
      const green = [22, 163, 74]; // #16a34a

      // Función para añadir gradiente simulado (con rectángulos)
      const addGradientHeader = () => {
        // Fondo azul principal
        pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
        pdf.rect(0, 0, pageWidth, 50, "F");

        // Simular gradiente con rectángulos más claros
        pdf.setFillColor(darkBlue[0], darkBlue[1], darkBlue[2]);
        pdf.rect(pageWidth * 0.3, 0, pageWidth * 0.7, 50, "F");
      };

      // Header con gradiente
      addGradientHeader();

      // Título principal (sin emoji para evitar problemas de encoding)
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(26);
      pdf.setFont("helvetica", "bold");
      pdf.text("CERTIFICADO DE FINALIZACION", pageWidth / 2, 25, {
        align: "center",
      });

      // Organización
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "normal");
      pdf.text(data.organization, pageWidth / 2, 35, { align: "center" });

      // Número de certificado
      const certNumber = `Certificado Nº CERT-${data.id
        .toString()
        .padStart(5, "0")}`;
      pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");

      // Fondo para el número de certificado
      const certNumWidth = pdf.getTextWidth(certNumber) + 20;
      const certNumX = (pageWidth - certNumWidth) / 2;
      pdf.setFillColor(240, 247, 255); // #f0f7ff
      pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.roundedRect(certNumX, 60, certNumWidth, 12, 6, 6, "FD");

      pdf.text(certNumber, pageWidth / 2, 68, { align: "center" });

      // Texto principal
      let currentY = 85;

      pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "normal");
      pdf.text("Se certifica que", pageWidth / 2, currentY, {
        align: "center",
      });

      currentY += 12;

      // Nombre del estudiante
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.setFontSize(28);
      pdf.setFont("helvetica", "bold");
      const studentName = data.student;
      pdf.text(studentName, pageWidth / 2, currentY, { align: "center" });

      // Línea debajo del nombre
      const nameWidth = pdf.getTextWidth(studentName);
      const lineStartX = (pageWidth - nameWidth) / 2;
      pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.setLineWidth(2);
      pdf.line(lineStartX, currentY + 3, lineStartX + nameWidth, currentY + 3);

      currentY += 18;

      pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "normal");
      pdf.text("ha completado exitosamente el curso", pageWidth / 2, currentY, {
        align: "center",
      });

      currentY += 12;

      // Título del curso
      pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");

      // Dividir el título del curso en líneas si es muy largo
      const courseTitle = data.course;
      const maxLineWidth = contentWidth - 40;
      const courseLines = pdf.splitTextToSize(courseTitle, maxLineWidth);

      for (let i = 0; i < courseLines.length; i++) {
        pdf.text(courseLines[i], pageWidth / 2, currentY + i * 7, {
          align: "center",
        });
      }

      currentY += courseLines.length * 7 + 18;

      // Detalles en dos columnas
      const col1X = margin + 20;
      const col2X = pageWidth / 2 + 10;
      const boxWidth = contentWidth / 2 - 30;
      const boxHeight = 16;

      // Función para crear caja de detalle
      const createDetailBox = (
        x: number,
        y: number,
        label: string,
        value: string,
        isGrade = false
      ) => {
        // Fondo de la caja
        const bgColor = isGrade ? [240, 253, 244] : [248, 249, 250]; // #f0fdf4 : #f8f9fa
        const borderColor = isGrade ? green : primaryBlue;

        pdf.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
        pdf.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
        pdf.setLineWidth(0.5);
        pdf.roundedRect(x, y, boxWidth, boxHeight, 3, 3, "FD");

        // Línea izquierda de color
        pdf.setLineWidth(3);
        pdf.line(x, y, x, y + boxHeight);

        // Label
        pdf.setTextColor(
          isGrade ? green[0] : lightGray[0],
          isGrade ? green[1] : lightGray[1],
          isGrade ? green[2] : lightGray[2]
        );
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.text(label, x + 5, y + 6);

        // Value
        pdf.setTextColor(
          isGrade ? 21 : darkGray[0],
          isGrade ? 128 : darkGray[1],
          isGrade ? 61 : darkGray[2]
        );
        pdf.setFontSize(11);
        pdf.setFont("helvetica", isGrade ? "bold" : "normal");
        pdf.text(value, x + 5, y + 13);
      };

      // Crear cajas de detalles
      createDetailBox(
        col1X,
        currentY,
        "Fecha de Finalizacion",
        formatDate(data.completionDate)
      );
      createDetailBox(
        col2X,
        currentY,
        "Fecha de Emision",
        formatDate(data.issueDate)
      );

      currentY += 20;

      if (data.duration || data.grade) {
        if (data.duration) {
          createDetailBox(col1X, currentY, "Duracion", data.duration);
        }
        if (data.grade) {
          createDetailBox(
            data.duration ? col2X : col1X,
            currentY,
            "Calificacion",
            data.grade,
            true
          );
        }
        currentY += 20;
      }

      // Línea de separación
      currentY += 10;
      pdf.setDrawColor(229, 231, 235); // #e5e7eb
      pdf.setLineWidth(1);
      pdf.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 10;

      // Sección de verificación y autoridad
      // Verificado (izquierda)
      pdf.setTextColor(green[0], green[1], green[2]);
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Certificado Verificado", margin + 20, currentY);

      // Autoridad (derecha)
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text(data.organization, pageWidth - margin - 20, currentY, {
        align: "right",
      });

      pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        "Autoridad Certificadora",
        pageWidth - margin - 20,
        currentY + 8,
        { align: "right" }
      );

      if (data.activityId) {
        pdf.setFontSize(10);
        pdf.text(
          `Actividad ID: ${data.activityId}`,
          pageWidth - margin - 20,
          currentY + 16,
          { align: "right" }
        );
        currentY += 20; // Ajustar si hay activityId
      } else {
        currentY += 12; // Ajustar si no hay activityId
      }

      // Footer - Posicionar después del contenido con margen suficiente
      currentY += 15; // Espacio adicional antes del footer

      // Verificar que el footer no se salga de la página
      const maxFooterY = pageHeight - 20;
      const footerY = Math.min(currentY, maxFooterY);

      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(0.5);
      pdf.line(margin, footerY, pageWidth - margin, footerY);

      pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");

      const footerText1 = "Este certificado es valido y verificable.";
      const footerText2 = `Emitido electronicamente por ${data.organization} - Certificado ID: ${data.id}`;
      const footerText3 = `Fecha de emision: ${new Date().toLocaleDateString(
        "es-ES"
      )}`;

      pdf.text(footerText1, pageWidth / 2, footerY + 6, { align: "center" });
      pdf.text(footerText2, pageWidth / 2, footerY + 11, { align: "center" });
      pdf.text(footerText3, pageWidth / 2, footerY + 16, { align: "center" });

      // Descargar el PDF
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
              <span>Descargar Certificado PDF</span>
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
          <span>Compartir Certificado</span>
        </button>
      </div>
    </>
  );
};
