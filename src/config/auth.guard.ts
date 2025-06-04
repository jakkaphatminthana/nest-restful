import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const url = request.url;

    Logger.debug(`Request URL: ${url}`);

    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    //verify token
    const auth = request.headers['authorization'];
    if (!auth || !auth.startsWith('Bearer')) {
      return false;
    }

    // Extract the token from the Authorization header
    const [type, token] = auth.split(' ');
    if (type !== 'Bearer') {
      return false;
    }

    // Verify the JWT token
    try {
      const playload = this.jwtService.verify(token);
      request['user'] = playload;
    } catch (error) {
      Logger.error(`JWT verification failed: ${error}`);
      throw new UnauthorizedException();
    }

    return true;
  }
}
