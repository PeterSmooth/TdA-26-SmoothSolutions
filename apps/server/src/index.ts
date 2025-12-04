import "dotenv/config";
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
    //try {
       // await initDatabase();
        console.log("✅ Databáze úspěšně připojena.");
   // } //catch (error) {
        // Tady uvidíme, proč to padá!
       // console.error("❌ CRITICAL ERROR: Nepodařilo se připojit k databázi!");
       // console.error(error);
   // }

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
