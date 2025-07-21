import AppError from "shared/errors/AppError"
import { Customer } from "../database/entities/Customer"
import { customerRepository } from "../database/repositories/CustomerRepositories"

interface IDeleteCustomer {
  id: number
}

export default class DeleteCustomerService {
  public async execute({ id }: IDeleteCustomer): Promise<Customer> {
    const customer = await customerRepository.findById(id)
    if(!customer) {
      throw new AppError('Customer not found.', 404)
    }

    await customerRepository.remove(customer)
    return customer
  }
}