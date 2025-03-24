import { Router, Request, Response } from "express"
import pageController from "../controllers/page.controller"
// import { checkLoggedOut } from "../middleware/auth.middleware"


const pageRouter = Router()

pageRouter.get("/", pageController.home )
pageRouter.get("/signup", pageController.signup)
pageRouter.get('/profile',pageController.profile)
pageRouter.get('/status',(req, res) => {
    pageController.status(req,res)
})

export default pageRouter