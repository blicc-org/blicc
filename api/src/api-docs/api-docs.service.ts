import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'
export class ApiDocsService {
  public getSwaggerJSON(): unknown {
    const swaggerDefinition = {
      openapi: '3.0.0',
      info: {
        title: 'blicc.org',
        version: '0.0.1',
        description: 'Data visualization framework api!',
      },
      host: 'api.blicc.org',
      basePath: '/',
    }

    const options = {
      swaggerDefinition,
      apis: [path.resolve(__dirname, '../**/*.router.ts')],
    }

    return swaggerJSDoc(options)
  }
}
