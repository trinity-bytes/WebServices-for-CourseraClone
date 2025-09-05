# Scripts

Herramientas auxiliares para generar o analizar payloads de ejemplo.

- analyze_generator.js: Analiza un payload base64 y muestra diferencias con el estándar.
- generate_payload.js: Genera un payload base64 de comprobante con UTF-8 correcto.
- generate_certificate.js: Genera un payload base64 de certificado con acentos.
- cleanup_unused.ps1: Elimina archivos duplicados/obsoletos en la raíz (migrados a scripts/, samples/ y docs/).

Uso rápido (Windows/PowerShell):

```powershell
node scripts/generate_payload.js
node scripts/generate_certificate.js
node scripts/analyze_generator.js
```

Limpieza de duplicados en la raíz (PowerShell):

```powershell
powershell -NoLogo -ExecutionPolicy Bypass -File scripts/cleanup_unused.ps1
```
