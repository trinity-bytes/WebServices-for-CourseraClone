import { ReceiptData, CertificateData, DocumentData } from "@/types";

/**
 * Convierte el formato estándar del QR al formato completo de la aplicación
 */
function expandQRData(data: any): any {
  // Si ya está en formato completo, devolverlo tal como está
  if (data.type && data.student && data.course) {
    return data;
  }

  // Convertir formato estándar a formato completo
  return {
    type: data.t === "r" ? "receipt" : data.t === "c" ? "certificate" : data.t,
    id: data.i,
    student: data.s,
    course: data.c,
    date: data.d,
    amount: data.a,
    courseType:
      data.ct === "c" ? "course" : data.ct === "e" ? "specialization" : data.ct,
    // Información adicional que se agrega automáticamente
    company: "CourseraClone Academy",
    studentId: data.i, // Usar el id de boleta como studentId
    activityId: data.i, // Usar el id de boleta como activityId
  };
}

/**
 * Obtiene los parámetros de la URL y decodifica el payload
 */
export function parseURLPayload(): DocumentData | null {
  try {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    // Buscar parámetros: 'd' (nuevo estándar), 'payload' y 'p' (compatibilidad)
    const payload =
      urlParams.get("d") || urlParams.get("payload") || urlParams.get("p");

    if (!payload) {
      throw new Error("No payload found in URL");
    }

    // Decodificar base64
    const jsonData = atob(payload);
    const rawData = JSON.parse(jsonData);

    // Expandir datos del formato estándar
    const data = expandQRData(rawData);

    // Validar estructura básica
    if (!data.type || !data.id || !data.student || !data.course) {
      throw new Error("Invalid data structure");
    }

    return data as DocumentData;
  } catch (error) {
    console.error("Error parsing URL payload:", error);
    return null;
  }
}

/**
 * Valida si los datos son de un comprobante de pago
 */
export function validateReceiptData(data: any): data is ReceiptData {
  return (
    data &&
    data.type === "receipt" &&
    typeof data.id === "number" &&
    typeof data.student === "string" &&
    typeof data.course === "string" &&
    typeof data.date === "string" &&
    typeof data.amount === "number" &&
    typeof data.studentId === "number" &&
    typeof data.activityId === "number"
  );
}

/**
 * Valida si los datos son de un certificado
 */
export function validateCertificateData(data: any): data is CertificateData {
  return (
    data &&
    data.type === "certificate" &&
    typeof data.id === "number" &&
    typeof data.student === "string" &&
    typeof data.course === "string" &&
    typeof data.completionDate === "string" &&
    typeof data.issueDate === "string" &&
    typeof data.studentId === "number" &&
    typeof data.activityId === "number"
  );
}

/**
 * Formatea la fecha para mostrar
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

/**
 * Formatea el monto con moneda
 */
export function formatAmount(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}
