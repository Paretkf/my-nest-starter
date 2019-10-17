import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module'
const port = process.env.PORT || 3000
const API_DEFAULT_PREFIX = '/api/v1/';

const SWAGGER_TITLE = 'My API';
const SWAGGER_DESCRIPTION = 'My Nest Starter API.';
const version = require('../package.json').version || '';
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(version)
    .addTag('my-api')
    .setSchemes('https', 'http')
    .addBearerAuth('Bearer', 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port)
}
bootstrap()
