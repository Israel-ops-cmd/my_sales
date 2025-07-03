import { Router } from 'express'
import ProductControllers from '../controllers/ProductsControllers'
import { createProductSchema, updateProductSchema, idParamsValidation } from 'src/schemas/ProductSchemas'

const productsRouter = Router()
const productsController = new ProductControllers()

productsRouter.get('/', productsController.index)
productsRouter.get('/:id', idParamsValidation, productsController.show)
productsRouter.post('/', createProductSchema, productsController.create)
productsRouter.put('/:id', updateProductSchema, productsController.update)
productsRouter.delete('/:id', idParamsValidation, productsController.delete)

export default productsRouter
