import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path : path.relative(__dirname, ".env")});