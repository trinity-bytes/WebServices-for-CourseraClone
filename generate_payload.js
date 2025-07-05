// Script para generar payload base64 con encoding UTF-8 correcto
const correctData = {
  t: "r",
  i: 12345,
  s: "María José García Rodríguez",
  c: "Desarrollo Full Stack con React y Node.js",
  d: "2024-12-15",
  a: 299.99,
  ct: "c",
};

console.log("=== DATOS ORIGINALES ===");
console.log("Estudiante:", correctData.s);
console.log("Curso:", correctData.c);
console.log("");

const correctJson = JSON.stringify(correctData);
console.log("=== JSON GENERADO ===");
console.log(correctJson);
console.log("");

const correctBase64 = Buffer.from(correctJson, "utf8").toString("base64");
console.log("=== BASE64 GENERADO ===");
console.log(correctBase64);
console.log("");

// Verificar que la decodificación funciona
const decoded = Buffer.from(correctBase64, "base64").toString("utf8");
const parsed = JSON.parse(decoded);
console.log("=== VERIFICACIÓN DE DECODIFICACIÓN ===");
console.log("Estudiante decodificado:", parsed.s);
console.log("Curso decodificado:", parsed.c);
console.log("¿Coincide el estudiante?", parsed.s === correctData.s);
console.log("¿Coincide el curso?", parsed.c === correctData.c);
