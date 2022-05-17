import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'express-async-errors';

//Routers
import { authRouter } from './routers/auth';
import { dashboardRouter } from './routers/dashboard';
import { userRouter } from './routers/user';
import { flightsRouter } from './routers/flights';
import { bookingRouter } from './routers/booking';
//Errors
import { NotFoundError } from './errors/not_found_error';
//Middilewares
import { errorHandler } from './middlewares/error_handler';
import { verify } from './middlewares/verify_token';

const app = express();
dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors({
    origin: ['http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    exposedHeaders: 'Set-Cookie'
}));

app.use('/api', verify);

app.use('/auth', authRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/user', userRouter);
app.use('/api/flights', flightsRouter);
app.use('/api/booking', bookingRouter);

app.all('*', (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };