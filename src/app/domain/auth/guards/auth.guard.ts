import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private readonly router: Router,
    private readonly firebase: FirebaseService
  ) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const hasUser = await firstValueFrom(this.firebase.hasUser$);

    if (hasUser) return true;

    this.router.navigate(['/auth']);

    return false;
  }
}
