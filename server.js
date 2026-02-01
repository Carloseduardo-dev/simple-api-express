import "dotenv/config"
import app from "./src/app/index.js"
import connectDB from "./src/lib/db.js";

const PORT = 3000
await connectDB();

app.listen(PORT, () => {
    console.log("Servidor escutando na porta " + PORT);
})