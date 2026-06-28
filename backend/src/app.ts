import express from "express"
import type { Request, Response } from "express"
import cors from "cors"
import taskRouter from "./routes/index.route.js"

const app = express();

app.use(cors());
app.use(express.json());

// Health of app
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Health of app is fine"
    });
});

app.use("/api/v1",taskRouter)
export default app;