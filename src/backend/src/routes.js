import express from "express";
import path from "path";

// File that contains routes used to load HTML files
const app = express();

export const router = express.Router();
const __dirname = path.resolve();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/loginBeacon.html'));
});

router.get("/informacoes", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/Info.html"));
});

router.get("/relatorio", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/RelatorioBeacon.html"));
});

router.get("/mapa", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/mapaTerreo.html"));
});

router.get("/novo-ativo", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/AddAtivo.html"));
});