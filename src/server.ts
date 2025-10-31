import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import pageRouter from './routes/page.routes'
import productRouter from './routes/products.routes'

// Create server
const app = express()

// Middleware
app.use(express.json())

// Routes
app.use("/", pageRouter)
app.use("/products", productRouter)

// Fallback
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Invalid route")
})

// Start server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})