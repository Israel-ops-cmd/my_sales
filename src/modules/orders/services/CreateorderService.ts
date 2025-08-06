import { Order } from "../database/entities/Order"
import { customerRepository } from "@modules/customers/database/repositories/CustomerRepositories"
import AppError from "shared/errors/AppError"
import { productsRepositories } from "@modules/products/database/repositories/ProductsRepositories"
import { orderRepositories } from "../database/repositories/OrderRepositories"
import { OrdersProducts } from "../database/entities/OrdersProducts"

interface ICreateOrder {
  customer_id: string,
  products: { id: number, quantity: number }[]
}

export class CreateOrderService {
  async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
    const customerExists = await customerRepository.findById(Number(customer_id))

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.')
    }

    const existsProducts = await productsRepositories.findAllByIds(products)

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.')
    }

    const existsProductsIds = products.map(product => product.id)

    const checkInexistentProducts = products.filter(product => !existsProductsIds.includes(product.id))

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0].id}.`, 404)
    }

    const quantityAvailable = products.filter(product => {
      const existentProduct = existsProducts.find(p => Number(p.id) === product.id)
      if (!existentProduct) return true
      return existentProduct.quantity < product.quantity
    })

    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`, 409)
    }

    const serializedProducts: OrdersProducts[] = products.map(product => {
      const orderProduct = new OrdersProducts()
      orderProduct.product_id = product.id
      orderProduct.quantity = product.quantity
      orderProduct.price = existsProducts.find(p => Number(p.id) === product.id)!.price
      return orderProduct
    })

    const order = await orderRepositories.createOrder({
      customer: customerExists,
      products: serializedProducts
    })

    const { order_products } = order

    const updatedProductsQuantity = order_products.map(product => {
      const existentProduct = existsProducts.find(p => p.id === product.product_id)
      if (!existentProduct) {
        throw new AppError(`Product with id ${product.product_id} not found to update quantity.`)
      }
      return {
        id: product.product_id,
        quantity: existentProduct.quantity - product.quantity
      }
    })

    await productsRepositories.save(updatedProductsQuantity)

    return order

  }
}