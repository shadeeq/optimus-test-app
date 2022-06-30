import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _isLoading$ = new BehaviorSubject(false);

  constructor() { }

  isLoading(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  startLoading(): void {
    this._isLoading$.next(true);
  }

  stopLoading(): void {
    this._isLoading$.next(false);
  }
}
