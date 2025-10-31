import { Router, Request, Response } from 'express'

const pageRouter = Router()

pageRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to my homepage.")
})

export default pageRouter