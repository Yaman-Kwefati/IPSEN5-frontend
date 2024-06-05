import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {map, take} from "rxjs/operators";

export const AdminGuard: () => Observable<boolean> = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAdmin().pipe(
    take(1),
    map(isAdmin => {
      if (isAdmin) {
        return true;
      }
      else {
        router.navigate(['/home']);
        return false;
      }
    })
  );
};
