import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'

export class ApiDocsService {
  public getSwaggerJSON(): unknown {
    const swaggerDefinition = {
      openapi: '3.0.0',
      info: {
        title: 'mock.blicc.org',
        version: '0.1.3',
        description: 'Mock api documentation',
      },
      host: 'mock.blicc.org',
      basePath: '/',
    }

    const options = {
      swaggerDefinition,
      apis: [path.resolve(__dirname, '../**/*.router.{js,ts}')],
    }

    return swaggerJSDoc(options)
  }
}
