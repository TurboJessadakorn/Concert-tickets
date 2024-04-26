import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Check if the request is coming from an admin
    const request = context.switchToHttp().getRequest();
    return request.headers.role === 'admin';
  }
}