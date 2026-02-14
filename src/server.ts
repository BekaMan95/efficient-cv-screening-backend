import express, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { ApiResponse } from './types';


dotenv.config();


const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '8000', 10);


connectDB();


const rawOrigins: string = process.env.CORS_ORIGIN || '';
const allowedOrigins: string[] = rawOrigins
  .split(',')
  .map((o) => o.trim())
  .filter((o) => o.length > 0);



app.use((req: Request, res: Response, next: NextFunction): void => {
  if (req.is('multipart/form-data')) {
    next();
  } else {
    express.json({ limit: '10mb' })(req, res, next);
  }
});

app.use(express.urlencoded({ extended: true, limit: '10mb' }));





app.use('*', (req: Request, res: Response<ApiResponse>) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    data: { path: req.originalUrl },
  });
});


const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response<ApiResponse>,
  _next: NextFunction,
): void => {
  if (err.message === 'CORS origin not allowed') {
    res.status(403).json({
      success: false,
      message: 'CORS origin not allowed',
    });
    return;
  }

  console.error('Error:', err);

  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && {
      data: { stack: err.stack ?? '' },
    }),
  });
};

app.use(errorHandler);


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
