// Análisis del payload del generador
const base64FromGenerator =
  "eyJ0IjoiciIsImkiOjEsInMiOiJFc3R1ZGlhbnRlIGRlIFBydWViYSIsImMiOiJDdXJzbyBkZSBQcm9ncmFtYWNpw7NuIiwiZCI6IjIwMjQtMTItMTUiLCJhIjo5OS45OSwiY3QiOiJjIn0=";

console.log("=== ANÁLISIS DEL PAYLOAD DEL GENERADOR ===");
const decoded = Buffer.from(base64FromGenerator, "base64").toString("utf8");
console.log("JSON decodificado:", decoded);
console.log("");

const parsed = JSON.parse(decoded);
console.log("=== DATOS PARSEADOS ===");
Object.entries(parsed).forEach(([key, value]) => {
  console.log(`  ${key}: "${value}" (${typeof value})`);
});

console.log("");
console.log("=== COMPARACIÓN CON FORMATO ESPERADO ===");
console.log("✅ Estructura correcta:", JSON.stringify(parsed, null, 2));
console.log("");
console.log("=== VERIFICACIÓN UTF-8 ===");
console.log("Curso con tilde:", parsed.c);
console.log('¿Contiene "ó"?', parsed.c.includes("ó"));
console.log("Longitud del curso:", parsed.c.length);

// Comparar con nuestro formato estándar
const standardFormat = {
  t: "r",
  i: 12345,
  s: "María José García Rodríguez",
  c: "Desarrollo Full Stack con React y Node.js",
  d: "2024-12-15",
  a: 299.99,
  ct: "c",
};

console.log("");
console.log("=== DIFERENCIAS CON NUESTRO ESTÁNDAR ===");
console.log("ID del generador:", parsed.i, "(debería ser número mayor)");
console.log("Nombre del generador:", parsed.s, "(muy genérico)");
console.log("Curso del generador:", parsed.c, "(falta detalles)");
