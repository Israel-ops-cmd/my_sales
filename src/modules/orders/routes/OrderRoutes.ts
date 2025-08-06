import { Router } from 'express'
import OrdersControllers from '../controller/OrdersControllers'
import AuthMiddleware from 'shared/middlewares/AuthMiddleware'
import { createOrderValidate, IdParamsValidate } from '../schemas/OrdersSchemas'

const ordersRouter = Router()
const ordersController = new OrdersControllers()

ordersRouter.use(AuthMiddleware.execute)

ordersRouter.get('/:id', IdParamsValidate, ordersController.show)
ordersRouter.post('/', createOrderValidate, ordersController.create)

export default ordersRouter