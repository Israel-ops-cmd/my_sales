import { usersRepositories } from "../database/repositories/UserRepositories"
import { User } from "../database/entities/User"

export default class ListUserService {
  async execute(): Promise<User[]> {
    const users = await usersRepositories.find()
    return users
  }
}