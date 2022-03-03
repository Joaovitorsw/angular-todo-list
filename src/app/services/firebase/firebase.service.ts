import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { Storage } from '@angular/fire/storage';
import { HotToastService } from '@ngneat/hot-toast';
import { FirebaseError } from 'firebase/app';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytes,
} from 'firebase/storage';
import { catchError, defer, Observable, switchMap, tap } from 'rxjs';
import {
  FirebaseThrowError,
  FirebaseToastMessage,
  FIREBASE_ERROR_MENSAGENS,
} from './firebase.service.models';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private auth: Auth,
    private storage: Storage,
    private toast: HotToastService
  ) {}

  createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    const observable$ = defer(() => {
      return createUserWithEmailAndPassword(this.auth, email, password);
    }).pipe(
      tap(() => {
        this.toast.success(FirebaseToastMessage.USER_CREATED);
      }),
      catchError((error: FirebaseError) => {
        this.toast.error(FIREBASE_ERROR_MENSAGENS[error.code] || error.code);
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
        this.toast.success(FirebaseToastMessage.USER_LOGGED_IN);
      }),
      catchError((error: FirebaseError) => {
        this.toast.error(FIREBASE_ERROR_MENSAGENS[error.code] || error.code);
        throw error.code;
      })
    );

    return observable$;
  }

  signInWithGoogle() {
    const hasFacebookAccount =
      this.auth.currentUser?.providerData[0].providerId === 'facebook.com';

    if (hasFacebookAccount)
      throw this.toast.error(FirebaseThrowError.USER_HAS_FACEBOOK_LOGIN);

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
        this.toast.success(FirebaseToastMessage.USER_LOGGED_IN);
      }),
      catchError((error: FirebaseError) => {
        this.toast.error(FIREBASE_ERROR_MENSAGENS[error.code] || error.code);
        throw error.code;
      })
    );

    return observable$;
  }

  registerUser(email: string, password: string, name: string, file: File) {
    return this.createUserWithEmailAndPassword(email, password).pipe(
      switchMap(() => {
        return this.uploadFile(file).pipe(
          switchMap((uploadTaskSnapshot) => {
            return this.updateProfile({
              displayName: name,
              photoURL: uploadTaskSnapshot,
            });
          })
        );
      })
    );
  }
  updateProfile(user: {
    displayName?: string | null;
    photoURL?: string | null;
  }) {
    const observable$ = defer(() => {
      if (!this.auth.currentUser)
        throw Error(FirebaseThrowError.USER_IS_NOT_LOGGED);
      return updateProfile(this.auth.currentUser, user);
    });

    return observable$;
  }

  uploadFile(file: File) {
    if (!this.auth.currentUser)
      throw Error(FirebaseThrowError.USER_IS_NOT_LOGGED);

    const urlRef = ref(
      this.storage,
      `users/${this.auth.currentUser.uid}/profile.jpg`
    );

    return this.uploadBytes(urlRef, file).pipe(
      switchMap((url) => {
        return this.getDownloadURL(url.ref);
      })
    );
  }

  uploadBytes(storage: StorageReference, file: File) {
    const observable$ = defer(() => {
      if (!this.auth.currentUser)
        throw Error(FirebaseThrowError.USER_IS_NOT_LOGGED);
      return uploadBytes(storage, file);
    });

    return observable$;
  }

  getDownloadURL(storage: StorageReference) {
    const observable$ = defer(() => {
      if (!this.auth.currentUser)
        throw Error(FirebaseThrowError.USER_IS_NOT_LOGGED);
      return getDownloadURL(storage);
    });

    return observable$;
  }

  logoff() {
    const observable$ = defer(() => {
      return this.auth.signOut();
    }).pipe(
      tap(() => {
        this.toast.success(FirebaseToastMessage.USER_LOGGED_OUT);
      })
    );

    return observable$;
  }
}
