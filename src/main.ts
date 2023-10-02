import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
        credentials: true,
    });

    const port = process.env.PORT || 8000;

    await app.listen(port, () => {
        console.log('Running on port ' + port);
    });
}
bootstrap();
