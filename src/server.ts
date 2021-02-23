import 'reflect-metadata'
import express from 'express'
import './database'

const app = express();



app.listen(3330, () => console.log("Server is running in port 3330!"))