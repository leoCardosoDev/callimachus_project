import { Authentication } from '@/domain/usecases'
import { HashCompare, LoadAccountByEmailRepository } from '@/application/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashCompare
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (account) {
      await this.hashComparer.compare(authenticationParams.password, account.password)
    }
    return null
  }
}
