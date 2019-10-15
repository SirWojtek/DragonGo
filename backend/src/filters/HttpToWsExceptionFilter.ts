import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(HttpException)
export class HttpToWsExceptionFilter extends BaseWsExceptionFilter {
  catch(error: HttpException, host: ArgumentsHost) {
    super.catch(new WsException(error.message), host);
  }
}
