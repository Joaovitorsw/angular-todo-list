import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';
import { FirebaseError } from 'firebase/app';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { catchError, defer, Observable, Subject, tap } from 'rxjs';
import { FIREBASE_ERROR_MENSAGENS } from './firebase.service.models';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  hasUser$ = new Subject<boolean>();

  constructor(private auth: Auth, private toast: HotToastService) {
    console.log('FirebaseService.constructor()');
    onAuthStateChanged(this.auth, (user) => {
      console.log(user);
      this.hasUser$.next(!!user);
    });
  }

  createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    const observable$ = defer(() => {
      return createUserWithEmailAndPassword(this.auth, email, password);
    }).pipe(
      tap(() => {
        this.toast.success('Usuário criado com sucesso!');
      }),
      catchError((error: FirebaseError) => {
        this.toast.error(FIREBASE_ERROR_MENSAGENS[error.code]);
        throw error.code;
      })
    );

    return observable$;
  }

  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    const observable$ = defer(() => {
      return signInWithEmailAndPassword(this.auth, email, password);
    }).pipe(
      tap(() => {
        this.toast.success('Usuário logado com sucesso!');
      }),
      catchError((error: FirebaseError) => {
        this.toast.error(FIREBASE_ERROR_MENSAGENS[error.code]);
        throw error.code;
      })
    );

    return observable$;
  }

  signInWithGoogle() {
    const hasFacebookAccount =
      this.auth.currentUser?.providerData[0].providerId === 'facebook.com';

    if (hasFacebookAccount)
      throw this.toast.error('Você já está logado com o Facebook.');

    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return this.singInWithPopup(provider);
  }

  signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    provider.addScope('user_birthday');
    provider.addScope('user_gender');
    provider.addScope('email');
    provider.addScope('user_location');
    provider.setCustomParameters({
      display: 'popup',
    });
    return this.singInWithPopup(provider);
  }

  private singInWithPopup(provider: GoogleAuthProvider | FacebookAuthProvider) {
    const observable$ = defer(() => {
      return signInWithPopup(this.auth, provider);
    }).pipe(
      tap((result) => {
        this.toast.success('Usuário logado com sucesso!');
      }),
      catchError((error: FirebaseError) => {
        this.toast.error(FIREBASE_ERROR_MENSAGENS[error.code]);
        throw error.code;
      })
    );

    return observable$;
  }
}
