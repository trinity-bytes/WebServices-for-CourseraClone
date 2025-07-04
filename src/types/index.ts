// Tipos para los datos de comprobantes
export interface ReceiptData {
  type: "receipt";
  id: number;
  student: string;
  course: string;
  date: string;
  amount: number;
  courseType: "course" | "specialization";
  studentId: number;
  activityId: number;
}

// Tipos para certificados (para futura implementación)
export interface CertificateData {
  type: "certificate";
  id: number;
  student: string;
  course: string;
  completionDate: string;
  issueDate: string;
  organization: string;
  grade?: string;
  duration?: string;
  studentId: number;
  activityId: number;
}

export type DocumentData = ReceiptData | CertificateData;
