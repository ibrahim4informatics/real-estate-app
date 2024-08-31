import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoute from './routes/auth.routes.js';
import postsRoutes from './routes/posts.routes.js';
import usersRoutes from './routes/users.routes.js';
import { authMiddleware } from './utils/auth.utils.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));


app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoutes);
app.use('/api/users', authMiddleware, usersRoutes);

app.listen(port, () => {
    console.log(`server listening on: http://localhost:${port}`);
})