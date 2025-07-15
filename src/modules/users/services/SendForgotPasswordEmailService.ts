import AppError from "shared/errors/AppError"
import { usersRepositories } from "../database/repositories/UserRepositories"
import { userTokensRepositories } from "../database/repositories/UserTokensRepositories"
import { sendEmail } from "@config/email"

interface IForgotPassword {
  email: string
}

export default class SendForgotPasswordEmailService {
  async execute({ email }: IForgotPassword): Promise<void> {
    const user = await usersRepositories.findByEmail(email)
    if(!user) {
      throw new AppError('user not found.', 404)
    }
    const token = await userTokensRepositories.generated(user.id)
    sendEmail({
      to: user.email,
      subject: 'My sales recovery password',
      body: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; text-align: center; border: 2px solid #04140a; border-radius: 10px; margin: auto; width: 60%;">
          <h1 style="color: #04140a;">Password Reset Verification Code</h1>
          <h3 style="color: #04140a;">Dear ${user.name},</h3>
          <p style="font-size: 16px; color: #333;">Recover your password with this token:</p>

          <strong style="border: 2px dashed #04140a; padding: 10px; border-radius: 5px; font-size: 16px; color: #04140a;">
            ${token?.token}
          </strong>

          <p style="margin-top: 20px;">
            Best regards,<br>
            <span style="font-weight: bold; color: #04140a;">My Sales Staff</span>
          </p>
        </div>
      `
    })
  }
}
