import express from "express";
const app = express();
import userRouter from "./routes/userRoutes.js";
// GENERAL MIDDLEWARES
app.use(express.json());

// ROUTES
app.use("/api/v1/users", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
