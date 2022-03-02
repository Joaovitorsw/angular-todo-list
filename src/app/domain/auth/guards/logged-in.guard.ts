import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly firebase: FirebaseService
  ) {}

  async canActivate(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Promise<boolean> {
    const hasUser = await firstValueFrom(this.firebase.hasUser$);
    if (hasUser) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
