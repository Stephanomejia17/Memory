import { HttpInterceptorFn } from '@angular/common/http';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    withCredentials: true // Esto asegura que las cookies (incluida la de sesión) se envíen con la petición
  });

  // Pasa la petición clonada al siguiente manejador
  return next(clonedRequest);
};
