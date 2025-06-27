import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const roleGuard: CanActivateChildFn = (childRoute, state) => {
  const role = localStorage.getItem('role');
  
    if (role != 'admin') {
      const router = inject(Router);
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
};
