import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { ResourceNotFoundException } from '@psycare/exceptions';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    private errorHandler(error: any) {
        if (error.detail.includes('is not present in table')) {
            return new ResourceNotFoundException();
        }

        if (/(email)[\s\S]+(already exists)/.test(error.detail)) {
            return new BadRequestException('Uma conta com esse email já existe');
        }

        if (error.message.includes('professional_user_index')) {
            return new BadRequestException('Já existe um acompanhamento entre as pessoas solicitadas');
        }

        if (error.message.includes('calendar_hour_index')) {
            return new BadRequestException('Horário já está ocupado');
        }

        return new BadRequestException(error.message);
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            catchError((err) => {
                if (err instanceof HttpException) return throwError(() => err);

                const error = this.errorHandler(err);
                return throwError(() => error);
            }),
        );
    }
}
