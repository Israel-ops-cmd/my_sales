import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import routes from './routes'
import ErrorHandleMiddleware from 'shared/middlewares/ErrorHandleMiddleware'
import { ErrorRequestHandler } from 'express'
import { AppDataSource } from 'shared/typeorm/data-source'

AppDataSource.initialize().then(async () => {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.use(routes)
  app.use(ErrorHandleMiddleware.handleError as unknown as ErrorRequestHandler)

  console.log('Connect to the database!')

  app.listen(3333, () => {
    console.log('Server started on port 3333!')
  })

}).catch(error => {
  console.error('Failed to connect database', error)
})

