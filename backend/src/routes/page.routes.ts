import { Router } from "express"
import pageController from "../controllers/page.controller"


const pageRouter = Router()

pageRouter.get("/", pageController.home )
pageRouter.get("/signup", pageController.signup)


export default pageRouter