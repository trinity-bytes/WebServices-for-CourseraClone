import { ReceiptData, CertificateData, DocumentData } from "@/types";

/**
 * Decodifica base64 con soporte UTF-8 robusto
 */
function decodeBase64UTF8(base64String: string): string {
  try {
    // Limpiar el base64 de espacios y caracteres no válidos
    const cleanBase64 = base64String.replace(/\s/g, "");

    // Decodificar usando atob
    const decoded = atob(cleanBase64);

    // Convertir a UTF-8 usando TextDecoder (método moderno)
    if (typeof TextDecoder !== "undefined") {
      const bytes = new Uint8Array(
        [...decoded].map((char) => char.charCodeAt(0))
      );
      const decoder = new TextDecoder("utf-8");
      return decoder.decode(bytes);
    }

    // Fallback: usar decodeURIComponent con escape
    try {
      return decodeURIComponent(escape(decoded));
    } catch {
      // Último recurso: decodificación directa
      return decoded;
    }
  } catch (error) {
    console.error("Error decoding base64:", error);
    throw error;
  }
}

/**
 * Limpia caracteres de encoding mal formateados
 */
function cleanEncodingIssues(text: string): string {
  // Reemplazar caracteres mal codificados comunes
  return text
    .replace(/Ã¡/g, "á")
    .replace(/Ã©/g, "é")
    .replace(/Ã­/g, "í")
    .replace(/Ã³/g, "ó")
    .replace(/Ãº/g, "ú")
    .replace(/Ã±/g, "ñ")
    .replace(/Ã¼/g, "ü")
    .replace(/Ã /g, "à")
    .replace(/Ã¨/g, "è")
    .replace(/Ã¬/g, "ì")
    .replace(/Ã²/g, "ò")
    .replace(/Ã¹/g, "ù");
}

/**
 * Convierte el formato estándar del QR al formato completo de la aplicación
 */
function expandQRData(data: any): any {
  // Si ya está en formato completo, devolverlo tal como está
  if (data.type && data.student && data.course) {
    return data;
  }

  // Limpiar problemas de encoding en strings
  const cleanStudent =
    typeof data.s === "string" ? cleanEncodingIssues(data.s) : data.s;
  const cleanCourse =
    typeof data.c === "string" ? cleanEncodingIssues(data.c) : data.c;

  // Coerción segura a tipos esperados
  const idNum = typeof data.i === "string" ? parseInt(data.i, 10) : data.i;
  const amountNum = typeof data.a === "string" ? parseFloat(data.a) : data.a;

  // Convertir formato estándar a formato completo
  const baseData = {
    type: data.t === "r" ? "receipt" : data.t === "c" ? "certificate" : data.t,
    id: idNum,
    student: cleanStudent,
    course: cleanCourse,
    courseType:
      data.ct === "c" ? "course" : data.ct === "e" ? "specialization" : data.ct,
    studentId: idNum, // Usar el id como studentId
    activityId: idNum, // Usar el id como activityId
  };

  // Para comprobantes de pago
  if (data.t === "r") {
    return {
      ...baseData,
      date: data.d,
      amount: amountNum,
      company: "CourseraClone Academy",
    };
  }

  // Para certificados
  if (data.t === "c") {
    return {
      ...baseData,
      completionDate: data.cd || data.d, // fecha de completación
      issueDate: data.id || new Date().toISOString().split("T")[0], // fecha de emisión
      organization: "CourseraClone Academy",
      grade: data.g, // calificación (opcional)
      duration: data.dur, // duración (opcional)
    };
  }

  // Fallback para formatos no reconocidos
  return baseData;
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

    // Decodificar base64 con soporte UTF-8 mejorado
    const jsonData = decodeBase64UTF8(payload);
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
  try {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback si Intl no está disponible
    return `S/ ${amount.toFixed(2)}`;
  }
}
