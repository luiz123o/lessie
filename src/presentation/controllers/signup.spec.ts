import { SignUpController } from './signUp'

describe('SignUpController', () => {
  test('should return 400 if no name provider', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        email: 'valid_email@email.com',
        password: 'valid_password',
        confirmationPassword: 'valid_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('missing param: name'))
  })

  test('should return 400 if no email provider', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        name: 'valid_name',
        password: 'valid_password',
        confirmationPassword: 'valid_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('missing param: email'))
  })
})
