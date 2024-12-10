import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const XhrInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const xhr = req.clone({
    headers: req.headers.set('X-Requested-With', 'XMLHttpRequest'),
  });
  return next(xhr);
};
