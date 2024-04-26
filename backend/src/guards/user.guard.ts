import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Check if the request is coming from a user (admin is able to access user api)
    const request = context.switchToHttp().getRequest();
    return request.headers.role === 'admin' || request.headers.role === 'user';
  }
}