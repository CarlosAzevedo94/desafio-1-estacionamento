// Servidor local opcional, apenas para servir os arquivos. Não possui banco de dados.
// Execute: node servidor.js
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const raiz = __dirname;
const tipos = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8" };
http.createServer((req, res) => {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405); res.end(); return;
  }
  let arquivo;
  try {
    const rota = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    arquivo = path.resolve(raiz, "." + (rota === "/" ? "/index.html" : rota));
    if (!arquivo.startsWith(raiz + path.sep)) throw new Error();
  } catch {
    res.writeHead(400); res.end("Caminho invalido"); return;
  }
  fs.readFile(arquivo, (erro, dados) => {
    if (erro) { res.writeHead(404); res.end("Arquivo nao encontrado"); return; }
    res.writeHead(200, { "Content-Type": tipos[path.extname(arquivo)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(req.method === "HEAD" ? undefined : dados);
  });
}).listen(5500, "127.0.0.1", () => console.log("Abra http://127.0.0.1:5500 no navegador. Encerre com Ctrl+C."));
