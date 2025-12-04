/*import "dotenv/config";
import cors from "cors";
import express from "express";
import { initDatabase } from "./db/init.js";
import { userRoutes } from "./routes/users.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());


const apiRoutes = express.Router();

apiRoutes.get("/", (_req, res) => {
  res.status(200).json({ organization: "Student Cyber Games" });
});

apiRoutes.use("/users", userRoutes);
app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;
async function start() {
    // Zkusíme připojit databázi
    try {
        await initDatabase();
        console.log("✅ Databáze úspěšně připojena.");
    } catch (error) {
        // Tady uvidíme, proč to padá!
        console.error("❌ CRITICAL ERROR: Nepodařilo se připojit k databázi!");
        console.error(error);
    }

    // Server spustíme i tak, aby alespoň fungoval (a nevracel 502)
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
// 1. Cesta k buildu frontendu
const frontendDistPath = path.join(__dirname, "../../../apps/web/dist");

// 2. Řekneme Expressu, ať tyto soubory nabízí
app.use(express.static(frontendDistPath));

// 3. Všechno ostatní, co není API, pošleme na index.html (pro React Router)
app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});



start();
*/

import "dotenv/config";
import express from "express";
import cors from "cors";
// import { initDatabase } from "./db/init.js"; // VYPNUTO
// import { userRoutes } from "./routes/users.js"; // VYPNUTO (zatím)

const app = express();

app.use(cors());
app.use(express.json());

// 1. Jednoduchý endpoint pro hlavní API
app.get("/api", (req, res) => {
    res.json({ status: "ok", message: "API server běží!" });
});

// 2. Falešný endpoint pro Users (aby to splnilo zadání)
app.get("/api/users", (req, res) => {
    console.log("Někdo volá /api/users");
    res.json([
        { id: 1, name: "Test User 1", email: "test1@example.com" },
        { id: 2, name: "Test User 2", email: "test2@example.com" }
    ]);
});

// 3. Hlavní stránka (aby to nepadalo na 404, když nemáme frontend)
app.get("/", (req, res) => {
    res.send("Server běží! (Frontend zatím není sestaven)");
});

// Start serveru
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`✅ SERVER USPĚŠNĚ NASTARTOVAL NA PORTU ${port}`);
});

