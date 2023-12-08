import express from 'express'
import type { Express, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app: Express = express()
const PORT = 8080

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient()

app.get('/todos', async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany()
  return res.json(todos)
})

app.post('/create', async (req: Request, res: Response) => {
  const { title } = req.body
  const result = await prisma.todo.create({
    data: {
      title: title
    }
  })
  return res.json(result)
})

app.put('/update/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  console.log(req.body)
  const { title, isCompleted } = req.body
  const result = await prisma.todo.update({
    where: { id },
    data: {
      title: title,
      isCompleted: isCompleted
    }
  })
  return res.json(result)
})

app.delete('/delete/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const result = await prisma.todo.delete({
    where: { id }
  })
  return res.json(result)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
