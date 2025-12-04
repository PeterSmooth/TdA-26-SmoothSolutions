import express from "express";
import { pool } from "@/db";

export const userRoutes = express.Router();

userRoutes.get("/", async (_req, res) => {
	/*try {
		const [rows] = await pool.execute("SELECT * FROM users");
		res.status(200).json(rows);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ error: "Failed to fetch users" });
	}
		*/
	const fakeUsers = [
        { id: 1, name: "Jan Novák", email: "jan@example.com" },
        { id: 2, name: "Petr Svoboda", email: "petr@example.com" }
    ];

    res.status(200).json(fakeUsers);
});
