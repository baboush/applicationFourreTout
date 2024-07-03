import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Logger } from "@nestjs/common";

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ValidationInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof BadRequestException) {
          const message = err.getResponse();
          this.logger.error(`Validation failed: ${JSON.stringify(message)}`);
          return throwError(err);
        } else {
          return throwError(err);
        }
      }),
    );
  }
}
