import { MissingParamError } from '../errors/missing-param-error'
import { EmailValidator } from '../protocols/email-validator'
import { SignUpController } from './signup'

interface SUTTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SUTTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUpController', () => {
  test('should return 400 if no name provider', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'valid_email@email.com',
        password: 'valid_password',
        confirmationPassword: 'valid_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 if no email provider', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name',
        password: 'valid_password',
        confirmationPassword: 'valid_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if no password provider', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@email.com',
        confirmationPassword: 'valid_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('should return 400 if no confirmation password provider', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamError('confirmationPassword')
    )
  })

  test('should return 400 if an invalid email is provide', () => {

  })
})
