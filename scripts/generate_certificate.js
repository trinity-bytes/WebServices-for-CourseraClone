// Script para generar payload de certificado de ejemplo
const certificateData = {
  t: "c", // type: certificate
  i: 54321, // id
  s: "Ana María Rodríguez Pérez", // student
  c: "Desarrollo Full Stack con React y Node.js", // course
  cd: "2024-12-10", // completion date
  id: "2024-12-15", // issue date
  g: "Excelente (95%)", // grade
  dur: "40 horas académicas", // duration
  ct: "c", // course type
};

console.log("=== CERTIFICADO DE EJEMPLO ===");
console.log("Datos del certificado:", JSON.stringify(certificateData, null, 2));

const jsonString = JSON.stringify(certificateData);
const base64 = Buffer.from(jsonString, "utf8").toString("base64");

console.log("");
console.log("=== PAYLOAD GENERADO ===");
console.log("Base64:", base64);

console.log("");
console.log("=== URL DE EJEMPLO ===");
console.log(`/WebServices-for-CourseraClone/v?d=${base64}`);

// Verificar decodificación
const decoded = Buffer.from(base64, "base64").toString("utf8");
const parsed = JSON.parse(decoded);
console.log("");
console.log("=== VERIFICACIÓN ===");
console.log("Estudiante:", parsed.s);
console.log("Curso:", parsed.c);
console.log("Tipo:", parsed.t === "c" ? "Certificado" : "Otro");
console.log("Calificación:", parsed.g);
