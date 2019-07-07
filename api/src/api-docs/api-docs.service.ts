import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
export class ApiDocsService {
  public getSwaggerJSON(): any {
    const swaggerDefinition = {
      openapi: '3.0.0',
      info: {
        title: 'blicc.org',
        version: '0.0.1',
        description: 'Data visualization framework api!',
      },
      basePath: '/',
    };

    const options = {
      swaggerDefinition,
      apis: [path.resolve(__dirname, '../**/*.controller.ts')],
    };

    return swaggerJSDoc(options);
  }
}
