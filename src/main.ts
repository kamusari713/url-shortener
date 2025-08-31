<<<<<<< HEAD
<<<<<<< HEAD
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
=======
=======
>>>>>>> 4a40b2c (feat: initial working version)
import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle("Url shortener")
    .setDescription("The url shortener API description")
    .setVersion("1.0")
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, documentFactory)

  await app.listen(3000)
}
bootstrap()
<<<<<<< HEAD
>>>>>>> 4a40b2c (feat: initial working version)
=======
>>>>>>> 4a40b2c (feat: initial working version)
