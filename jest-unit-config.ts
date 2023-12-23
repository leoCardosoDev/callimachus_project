import type { Config } from '@jest/types'
import baseConfig from './jest.config'

const config: Config.InitialOptions = { ...baseConfig }

config.testMatch = ['**/*.spec.ts']

export default config
