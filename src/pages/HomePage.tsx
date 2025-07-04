import React from "react";
import { QrCode, Shield, Download, Smartphone } from "lucide-react";

export const HomePage: React.FC = () => {
  // URL de ejemplo para testing
  const examplePayload = btoa(
    JSON.stringify({
      type: "receipt",
      id: 1,
      student: "Estudiante de Prueba",
      course: "Curso de Programación",
      date: "2024-12-15",
      amount: 99.99,
      courseType: "course",
      studentId: 1001,
      activityId: 101,
    })
  );

  const exampleURL = `/WebServices-for-CourseraClone/verify/data?payload=${examplePayload}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-coursera-blue text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <QrCode size={32} />
            <h1 className="text-2xl font-bold">CourseraClone</h1>
          </div>
          <p className="text-center text-blue-100 mt-2">
            Verificador de Comprobantes y Certificados
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bienvenido al Verificador de Documentos
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Escanea códigos QR para verificar la autenticidad de comprobantes de
            pago y certificados de CourseraClone Academy.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <QrCode className="mx-auto text-coursera-blue mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Escaneo QR
            </h3>
            <p className="text-gray-600">
              Escanea códigos QR desde tu dispositivo móvil para verificar
              documentos al instante.
            </p>
          </div>

          <div className="card text-center">
            <Shield className="mx-auto text-coursera-success mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Verificación Segura
            </h3>
            <p className="text-gray-600">
              Todos los documentos son verificados con tecnología segura y
              confiable.
            </p>
          </div>

          <div className="card text-center">
            <Download
              className="mx-auto text-coursera-warning mb-4"
              size={48}
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Descarga PDF
            </h3>
            <p className="text-gray-600">
              Descarga una copia en PDF de alta calidad de tus comprobantes y
              certificados.
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Smartphone className="mr-2 text-coursera-blue" size={24} />
            Cómo usar el verificador
          </h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="bg-coursera-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                1
              </span>
              <span>
                Escanea el código QR del comprobante o certificado con la cámara
                de tu dispositivo
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-coursera-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                2
              </span>
              <span>
                Serás redirigido automáticamente a la página de verificación
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-coursera-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                3
              </span>
              <span>
                Revisa los detalles del documento y descarga una copia en PDF si
                lo deseas
              </span>
            </li>
          </ol>
        </div>

        {/* Demo Section */}
        <div className="card mt-8 bg-blue-50 border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            🧪 Prueba la Funcionalidad
          </h3>
          <p className="text-gray-700 mb-4">
            Haz clic en el siguiente enlace para ver un comprobante de ejemplo:
          </p>
          <a
            href={exampleURL}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <QrCode size={20} />
            <span>Ver Comprobante de Ejemplo</span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>
            &copy; 2024 CourseraClone Academy. Todos los derechos reservados.
          </p>
          <p className="text-sm mt-2">
            Verificador de documentos académicos seguro y confiable.
          </p>
        </div>
      </footer>
    </div>
  );
};
