import React from "react";
import { ReceiptData } from "@/types";
import { formatDate, formatAmount } from "@/utils/dataParser";
import { Receipt, Calendar, User, BookOpen, CreditCard } from "lucide-react";

interface ReceiptViewerProps {
  data: ReceiptData;
}

export const ReceiptViewer: React.FC<ReceiptViewerProps> = ({ data }) => {
  return (
    <div className="receipt-container">
      {/* Header */}
      <div className="bg-coursera-blue text-white p-6 text-center">
        <Receipt className="mx-auto mb-2" size={32} />
        <h1 className="text-xl font-bold">COMPROBANTE DE PAGO</h1>
        <p className="text-blue-100 text-sm mt-1">CourseraClone Academy</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Receipt Number */}
        <div className="text-center border-b border-gray-200 pb-4">
          <p className="text-sm text-gray-600">Nº de Comprobante</p>
          <p className="text-lg font-bold text-coursera-blue">
            COMP-{data.id.toString().padStart(3, "0")}
          </p>
        </div>

        {/* Course Info */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <BookOpen
              className="text-coursera-blue mt-1 flex-shrink-0"
              size={20}
            />
            <div>
              <p className="text-sm text-gray-600">Curso</p>
              <p className="font-semibold text-gray-900">{data.course}</p>
              <p className="text-xs text-gray-500 capitalize">
                {data.courseType === "course"
                  ? "Curso Individual"
                  : "Especialización"}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <User className="text-coursera-blue mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-gray-600">Estudiante</p>
              <p className="font-semibold text-gray-900">{data.student}</p>
              <p className="text-xs text-gray-500">ID: {data.studentId}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Calendar
              className="text-coursera-blue mt-1 flex-shrink-0"
              size={20}
            />
            <div>
              <p className="text-sm text-gray-600">Fecha de Pago</p>
              <p className="font-semibold text-gray-900">
                {formatDate(data.date)}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CreditCard
              className="text-coursera-blue mt-1 flex-shrink-0"
              size={20}
            />
            <div className="w-full">
              <p className="text-sm text-gray-600">Método de Pago</p>
              <p className="font-semibold text-gray-900">Tarjeta de Crédito</p>
              <p className="text-xs text-gray-500">**** **** **** 1234</p>
              <p className="text-xs text-gray-500">VISA - Aprobado</p>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Detalles de la Transacción
          </h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span>{formatAmount(data.amount * 0.85)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">IGV (18%):</span>
              <span>{formatAmount(data.amount * 0.15)}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 pt-1 border-t">
              <span>Total:</span>
              <span className="text-coursera-blue">
                {formatAmount(data.amount)}
              </span>
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="bg-coursera-blue text-white rounded-lg p-4 text-center">
          <p className="text-sm opacity-90 mb-1">Monto Pagado</p>
          <p className="text-2xl font-bold">{formatAmount(data.amount)}</p>
          <p className="text-xs opacity-75 mt-1">Procesado exitosamente</p>
        </div>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Actividad ID: {data.activityId}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Este comprobante es válido y verificable
          </p>
        </div>
      </div>
    </div>
  );
};
