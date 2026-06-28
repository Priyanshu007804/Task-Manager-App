import express from "express"
import type { Request, Response } from "express"
import cors from "cors"

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

export default app;