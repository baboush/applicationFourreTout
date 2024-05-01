import { HttpException, HttpStatus } from '@nestjs/common';

export class HandlerExceptionsImplemention extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message, statusCode);
  }

  static handlerNotFoundException(
    message: string,
  ): HandlerExceptionsImplemention {
    return new HandlerExceptionsImplemention(message, HttpStatus.NOT_FOUND);
  }
  static handlerUnauthorizedException(
    message: string,
  ): HandlerExceptionsImplemention {
    return new HandlerExceptionsImplemention(message, HttpStatus.UNAUTHORIZED);
  }
  static handlerBadRequestException(
    message: string,
  ): HandlerExceptionsImplemention {
    return new HandlerExceptionsImplemention(message, HttpStatus.BAD_REQUEST);
  }
  static handlerForbiddenException(
    message: string,
  ): HandlerExceptionsImplemention {
    return new HandlerExceptionsImplemention(message, HttpStatus.FORBIDDEN);
  }
  static handlerInternalServerErrorException(
    message: string,
  ): HandlerExceptionsImplemention {
    return new HandlerExceptionsImplemention(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  static handlerBadGatewayException(
    message: string,
  ): HandlerExceptionsImplemention {
    return new HandlerExceptionsImplemention(message, HttpStatus.BAD_GATEWAY);
  }
}
