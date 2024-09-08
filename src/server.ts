import app from "./app"
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.port || 4000;

app.listen(PORT, () => {
    console.log(`The Server is running on PORT: ${PORT}`);
});