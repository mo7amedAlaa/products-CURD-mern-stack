import dotenv from "dotenv";
import express from "express";
import path from "path";
import fs from "fs";
import connectDB from "./config/db.js";
import productRouter from "./routes/products.route.js";

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
const __dirname = path.resolve();

// Routes API
app.use("/api/products", productRouter);

// Production setup (CRA or Vite)
if (process.env.NODE_ENV === "production") {
    // شوف الأول dist بتاع Vite
    const viteDist = path.join(__dirname, "frontend", "dist");
    const craBuild = path.join(__dirname, "frontend", "build");

    const staticPath = fs.existsSync(viteDist) ? viteDist : craBuild;

    app.use(express.static(staticPath));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(staticPath, "index.html"))
    );
}

app.listen(port, () => {
    connectDB().then(() =>
        console.log("🚀 Server started on port:" + port)
    );
});
