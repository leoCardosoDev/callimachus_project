import { DbAuthentication } from '@/application/usecases'

import { mockAuthenticationParams, throwError } from '@/tests/domain/mocks'
import { HashCompareSpy, LoadAccountByEmailRepositorySpy } from '@/tests/application/mocks'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashCompareSpy: HashCompareSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashCompareSpy = new HashCompareSpy()
  const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, hashCompareSpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashCompareSpy
  }
}

describe('DbAuthentication Usecase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null
    const model = await sut.auth(mockAuthenticationParams())
    expect(model).toBeNull()
  })

  test('should call HashCompare with correct values', async () => {
    const { sut, loadAccountByEmailRepositorySpy, hashCompareSpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(hashCompareSpy.plaintext).toBe(authenticationParams.password)
    expect(hashCompareSpy.digest).toBe(loadAccountByEmailRepositorySpy.result?.password)
  })

  test('should throw if HashCompare throws', async () => {
    const { sut, hashCompareSpy } = makeSut()
    jest.spyOn(hashCompareSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
})
