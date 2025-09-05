# Removes duplicate/obsolete files from the repository root that were reorganized into scripts/, samples/, and docs/
$ErrorActionPreference = 'SilentlyContinue'

$root = Split-Path -Parent $PSScriptRoot
$targets = @(
  'analyze_generator.js',
  'generate_payload.js',
  'generate_certificate.js',
  'HomePage_nuevo.tsx',
  'simple_payload.json',
  'test_payload.json',
  'temp_payload.json',
  'clean_payload.json',
  'WebServices_Coursera_Especificaciones.md'
)

$removed = @()
$kept = @()
foreach ($t in $targets) {
  $path = Join-Path $root $t
  if (Test-Path $path) {
    Remove-Item -LiteralPath $path -Force -ErrorAction SilentlyContinue
    if (-not (Test-Path $path)) {
      $removed += $t
    } else {
      $kept += $t
    }
  }
}

Write-Host "Removed:" ($removed -join ', ')
if ($kept.Count -gt 0) {
  Write-Host "Kept (not removed due to permission/lock):" ($kept -join ', ')
}
