import { Request, Response } from 'express'
import ListProductService from '../services/ListProductService'
import ShowProductService from '../services/ShowProductService'
import CreateProductService from '../services/CreateProductService'
import DeleteProductService from '../services/DeleteProductService'
import UpdateProductService from '../services/UpdateProductService'

export default class ProductControllers {
  async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = new ListProductService()
    const products = await listProductsService.execute()
    return response.json(products)
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const showProductService = new ShowProductService()
    const product = await showProductService.execute({ id })
    return response.json(product)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body
    const createProductService = new CreateProductService()
    const product = await createProductService.execute({ name, price, quantity })
    return response.json(product)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id, name, price, quantity } = request.body
    const updateProductService = new UpdateProductService()
    const product = await updateProductService.execute({ id, name, price, quantity })
    return response.json(product)
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const{ id } = request.params
    const deleteProductService = new DeleteProductService()
    await deleteProductService.execute({ id })
    return response.status(204).send([])
  }
}