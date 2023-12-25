import { LoadAccountByEmailRepository } from '@/application/protocols'
import faker from 'faker'

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result: LoadAccountByEmailRepository.Result | null = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result | null> {
    this.email = email
    return this.result
  }
}
