import express, { Request, Response } from "express"
import cookieSession from "cookie-session"
import cors from "cors"
import pageRouter from "./routes/page.routes"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
const SIGN_KEY = process.env.COOKIE_SIGN_KEY
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY
if(!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error("Missing Cookie Keys")
}
app.use(express.json())
app.use(cookieSession({
    name:"session",
    keys: [
        SIGN_KEY,
        ENCRYPT_KEY
    ],
    maxAge: 24 * 60 * 60 * 1000
}))

app.use("/", pageRouter)

app.use((req:Request, res: Response) => {
    res.status(404).send("Page not found")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`)
})