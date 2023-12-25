import { LoadAccountByEmailRepository } from '@/application/protocols'

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result: LoadAccountByEmailRepository.Result | null = null

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result | null> {
    this.email = email
    return this.result
  }
}
