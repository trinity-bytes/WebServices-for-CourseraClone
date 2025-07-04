import React from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  message = "No se pudo cargar el documento",
  onRetry,
}) => {
  const handleGoHome = () => {
    window.location.href = "/WebServices-for-CourseraClone/";
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card max-w-md w-full text-center">
        <div className="mb-6">
          <AlertTriangle
            className="mx-auto text-coursera-error mb-4"
            size={48}
          />
          <h1 className="text-xl font-bold text-gray-900 mb-2">ERROR</h1>
          <p className="text-gray-600 leading-relaxed">{message}</p>
          <p className="text-sm text-gray-500 mt-2">
            El enlace parece estar dañado o es inválido.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <RefreshCw size={20} />
            <span>Reintentar</span>
          </button>

          <button
            onClick={handleGoHome}
            className="btn-secondary w-full flex items-center justify-center space-x-2"
          >
            <Home size={20} />
            <span>Ir al Inicio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
