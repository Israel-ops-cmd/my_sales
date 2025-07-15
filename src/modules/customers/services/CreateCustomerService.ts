import AppError from "shared/errors/AppError"
import { Customer } from "../database/entities/Customer"
import { customerRepository } from "../database/repositories/CustomerRepositories"

interface ICreateCustomer {
  name: string,
  email: string
}

export default class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await customerRepository.findByEmail(email)

    if(emailExists) {
      throw new AppError('Email adress already used.', 409)
    }

    const customer = customerRepository.create({
      name,
      email
    })

    await customerRepository.save(customer)

    return customer
  }
}