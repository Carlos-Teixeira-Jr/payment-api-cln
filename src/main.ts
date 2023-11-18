import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import * as cors from 'cors'

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Payment API')
    .setDescription('Api para pagamentos')
    .setVersion('1.0.0')
    .addTag('payment')
    .addTag('customer')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  setupSwagger(app)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.enableCors()
  app.use(cors())
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
