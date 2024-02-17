import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();

if (!process.env.PORT) {
    process.exit();
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});