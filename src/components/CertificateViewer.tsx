import React from "react";
import {
  Award,
  Calendar,
  User,
  GraduationCap,
  Clock,
  Shield,
} from "lucide-react";
import { CertificateData } from "@/types";
import { formatDate } from "@/utils/dataParser";

interface CertificateViewerProps {
  data: CertificateData;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({
  data,
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header elegante para certificado */}
      <div className="bg-gradient-to-r from-coursera-blue to-blue-600 text-white p-8 text-center relative">
        <div className="absolute top-4 left-4 opacity-20">
          <Award size={64} />
        </div>
        <div className="absolute top-4 right-4 opacity-20">
          <GraduationCap size={64} />
        </div>

        <div className="relative z-10">
          <Award className="mx-auto mb-4" size={48} />
          <h1 className="text-3xl font-bold mb-2">
            CERTIFICADO DE FINALIZACIÓN
          </h1>
          <p className="text-blue-100 text-lg">{data.organization}</p>
        </div>
      </div>

      {/* Contenido principal del certificado */}
      <div className="p-8">
        {/* Número de certificado */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
            <span className="text-blue-600 font-semibold text-lg">
              Certificado Nº CERT-{data.id.toString().padStart(5, "0")}
            </span>
          </div>
        </div>

        {/* Mensaje principal */}
        <div className="text-center mb-8">
          <p className="text-xl text-gray-700 mb-4">Se certifica que</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 border-b-2 border-coursera-blue inline-block pb-2">
            {data.student}
          </h2>
          <p className="text-xl text-gray-700 mb-4">
            ha completado exitosamente el curso
          </p>
          <h3 className="text-2xl font-semibold text-coursera-blue mb-6">
            {data.course}
          </h3>
        </div>

        {/* Detalles del certificado */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <User className="text-coursera-blue" size={24} />
              <div>
                <div className="text-sm font-medium text-gray-500">
                  Estudiante
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {data.student}
                </div>
                <div className="text-sm text-gray-600">
                  ID: {data.studentId}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Calendar className="text-coursera-blue" size={24} />
              <div>
                <div className="text-sm font-medium text-gray-500">
                  Fecha de Finalización
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatDate(data.completionDate)}
                </div>
              </div>
            </div>

            {data.duration && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="text-coursera-blue" size={24} />
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Duración
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {data.duration}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <GraduationCap className="text-coursera-blue" size={24} />
              <div>
                <div className="text-sm font-medium text-gray-500">Curso</div>
                <div className="text-lg font-semibold text-gray-900">
                  {data.course}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Calendar className="text-coursera-blue" size={24} />
              <div>
                <div className="text-sm font-medium text-gray-500">
                  Fecha de Emisión
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatDate(data.issueDate)}
                </div>
              </div>
            </div>

            {data.grade && (
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Award className="text-green-600" size={24} />
                <div>
                  <div className="text-sm font-medium text-green-600">
                    Calificación
                  </div>
                  <div className="text-lg font-semibold text-green-800">
                    {data.grade}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Validación y firma */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-green-600 mb-4 md:mb-0">
              <Shield size={20} />
              <span className="font-medium">Certificado Verificado</span>
            </div>

            <div className="text-center md:text-right">
              <div className="text-lg font-semibold text-gray-900">
                {data.organization}
              </div>
              <div className="text-sm text-gray-600">
                Autoridad Certificadora
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Actividad ID: {data.activityId}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer del certificado */}
      <div className="bg-gray-50 px-8 py-4 text-center text-sm text-gray-600">
        <p>
          Este certificado es válido y verificable. Para validar su
          autenticidad, escanee el código QR o visite nuestro sitio web oficial.
        </p>
        <p className="mt-1">
          Emitido electrónicamente por {data.organization} • Certificado ID:{" "}
          {data.id}
        </p>
      </div>
    </div>
  );
};
