import React from "react";
import { QrCode, Shield, Download, Smartphone } from "lucide-react";

export const HomePage: React.FC = () => {
  // Payloads de ejemplo con encoding UTF-8 correcto
  const standardPayload =
    "eyJ0IjoiciIsImkiOjEyMzQ1LCJzIjoiTWFyw61hIEpvc8OpIEdhcmPDrWEgUm9kcsOtZ3VleiIsImMiOiJEZXNhcnJvbGxvIEZ1bGwgU3RhY2sgY29uIFJlYWN0IHkgTm9kZS5qcyIsImQiOiIyMDI0LTEyLTE1IiwiYSI6Mjk5Ljk5LCJjdCI6ImMifQ==";

  const certificatePayload =
    "eyJ0IjoiYyIsImkiOjU0MzIxLCJzIjoiQW5hIE1hcsOtYSBSb2Ryw61ndWV6IFDDqXJleiIsImMiOiJEZXNhcnJvbGxvIEZ1bGwgU3RhY2sgY29uIFJlYWN0IHkgTm9kZS5qcyIsImNkIjoiMjAyNC0xMi0xMCIsImlkIjoiMjAyNC0xMi0xNSIsImciOiJFeGNlbGVudGUgKDk1JSkiLCJkdXIiOiI0MCBob3JhcyBhY2Fkw6ltaWNhcyIsImN0IjoiYyJ9";

  const exampleReceiptURL = `/WebServices-for-CourseraClone/v?d=${standardPayload}`;
  const exampleCertificateURL = `/WebServices-for-CourseraClone/v?d=${certificatePayload}`;

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
            Verificación de Documentos Académicos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Verifica la autenticidad de tus comprobantes de pago y certificados
            de CourseraClone Academy de forma rápida y segura.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="card text-center">
            <Shield className="mx-auto mb-4 text-coursera-blue" size={48} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Verificación Segura
            </h3>
            <p className="text-gray-600">
              Todos los documentos están protegidos con códigos QR únicos y
              cifrado avanzado.
            </p>
          </div>

          <div className="card text-center">
            <QrCode className="mx-auto mb-4 text-coursera-blue" size={48} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Códigos QR</h3>
            <p className="text-gray-600">
              Escanea el código QR del documento para acceder instantáneamente a
              la información de verificación.
            </p>
          </div>

          <div className="card text-center">
            <Download className="mx-auto mb-4 text-coursera-blue" size={48} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Descarga PDF
            </h3>
            <p className="text-gray-600">
              Descarga una copia en PDF de tu comprobante verificado para tus
              registros.
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
            Haz clic en los siguientes enlaces para ver ejemplos de documentos:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Comprobante */}
            <div className="space-y-3">
              <a
                href={exampleReceiptURL}
                className="btn-primary w-full inline-flex items-center justify-center space-x-2"
              >
                <QrCode size={20} />
                <span>Ver Comprobante de Pago</span>
              </a>
              <div className="text-sm text-gray-600">
                <p>📄 Comprobante de pago estándar</p>
                <p>✅ Con tildes y caracteres especiales</p>
                <p>💰 Incluye descarga PDF e HTML</p>
              </div>
            </div>

            {/* Certificado */}
            <div className="space-y-3">
              <a
                href={exampleCertificateURL}
                className="btn-secondary w-full inline-flex items-center justify-center space-x-2"
              >
                <QrCode size={20} />
                <span>Ver Certificado</span>
              </a>
              <div className="text-sm text-gray-600">
                <p>🏆 Certificado de finalización</p>
                <p>⭐ Con calificación y duración</p>
                <p>📋 Diseño profesional</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
            <p>
              <strong>Especificaciones técnicas:</strong>
            </p>
            <p className="mt-1">
              ✅ Formato estándar definitivo con parámetro 'd'
            </p>
            <p>✅ Compatible con nombres completos (sin truncar)</p>
            <p>✅ Empresa CourseraClone Academy automática</p>
            <p>✅ Soporte completo para caracteres especiales (ñ, tildes)</p>
            <p>✅ Routing corregido para GitHub Pages</p>
          </div>
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
