import express from "express";
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json()); 
app.use(cookieParser());

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//import routes
import userRoutes from './routes/userRoutes.js';  // Use .js extension
app.use("/api/users", userRoutes);