import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { HttpException, ArgumentsHost, Catch } from '@nestjs/common';

@Catch(HttpException)
export class HttpToWsExceptionFilter extends BaseWsExceptionFilter {
  catch(error: HttpException, host: ArgumentsHost) {
    super.catch(new WsException(error.message), host);
  }
}
