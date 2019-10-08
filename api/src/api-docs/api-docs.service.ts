import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'

export class ApiDocsService {
  public getSwaggerJSON(): unknown {
    const swaggerDefinition = {
      openapi: '3.0.0',
      info: {
        title: 'api.blicc.org',
        version: '0.0.2',
        description: 'Backend api documentation',
      },
      components: {
        securitySchemes: {
          cookieAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'access_token_api',
            description:
              'A JWT is stored in a cookie. It is used to authenticate the client who hands it over on each api request. It is secured against man-in-the-middle attacks via the Secure flag, against CSRF via the SameSite flag as well as against read access of a XSS attack via the HttpOnly flag.',
          },
          twoFactorAuth: {
            type: 'Two-factor Authentication',
            description:
              'Additional to the jwt you can activate two-factor auth which increases the security of the application on entry level.',
          },
        },
      },
      host: 'api.blicc.org',
      basePath: '/',
    }

    const options = {
      swaggerDefinition,
      apis: [path.resolve(__dirname, '../**/*.router.{js,ts}')],
    }

    return swaggerJSDoc(options)
  }
}
