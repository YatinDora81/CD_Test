import express from "express"
import {config} from "dotenv"
import cors from "cors"


const app = express()
const PORT = 3000
config()
app.use(cors({
    origin : "http://localhost:5173"
}))

app.listen(PORT , ()=>{
    console.log(`APP running at ${PORT}`);
})
