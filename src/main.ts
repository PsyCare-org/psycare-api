import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorInterceptor } from '@psycare/interceptors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalInterceptors(new ErrorInterceptor());

    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
        credentials: true,
    });

    const config = new DocumentBuilder().setTitle('PsyCare Data API Documentation').setVersion('1.0').build();
    SwaggerModule.setup('', app, SwaggerModule.createDocument(app, config), { customSiteTitle: 'PsyCare Data API' });

    const port = process.env.PORT || 8000;
    await app.listen(port, () => {
        console.log('Running on port ' + port);
    });
}
bootstrap();
