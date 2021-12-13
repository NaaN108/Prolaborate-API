module.exports = {

    clearMocks: true,
  
    preset: 'ts-jest',
  
    testEnvironment: 'node',
  
    setupFilesAfterEnv: ['./context.ts'],
  
  }