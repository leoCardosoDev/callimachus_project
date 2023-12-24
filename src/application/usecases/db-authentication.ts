import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '../protocols'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}
  async auth (authenticationParams: Authentication.Params): Promise<any> {
    await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
  }
}
