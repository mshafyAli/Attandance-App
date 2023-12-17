import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();



// DataBase
 async function run(){
    try{
        await mongoose.connect(process.env.MONGO)
        console.log('Successfully connected to MongoDB');
    }catch(e){
        console.log(e);
        await mongoose.disconnect();
        process.exit(1);
    }
}
    run().catch(console.dir)
     process.on('SIGINT', async () => {
        console.log('app is terminating');
        await mongoose.disconnect();
        process.exit(0);
        
});
const __dirname = path.resolve();
const app = express();
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


app.use(express.json());
app.use(cookieParser());


app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})