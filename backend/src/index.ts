import { app } from "./app";
import { connectDB } from "./config/database/mongodb";

app.listen(process.env.PORT || 5000, () => {
    console.log("API is working now! Port number: " + process.env.PORT);
    connectDB(`${process.env.CONNECTION_STRING}`);
});
