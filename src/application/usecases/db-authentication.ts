import { Authentication } from '@/domain/usecases'
import { Encrypter, HashCompare, LoadAccountByEmailRepository } from '@/application/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashCompare,
    private readonly encrypter: Encrypter
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        return {
          accessToken,
          name: account.name
        }
      }
    }
    return null
  }
}
