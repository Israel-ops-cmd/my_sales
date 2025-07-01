import { Router } from 'express'
import ProductControllers from '../controllers/ProductsControllers'

const productsRouter = Router()
const productsController = new ProductControllers()

productsRouter.get('/', productsController.index)
productsRouter.get('/:id', productsController.show)
productsRouter.post('/', productsController.create)
productsRouter.put('/:id', productsController.update)
productsRouter.delete('/:id', productsController.delete)

export default productsRouter
