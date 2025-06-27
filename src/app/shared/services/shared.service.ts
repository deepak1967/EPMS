import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private headerTitleSubject = new BehaviorSubject<string>('EPMS');
  headerTitle$ = this.headerTitleSubject.asObservable();

  constructor() { }


  setTitle(title: string): void {
    this.headerTitleSubject.next(title);
  }
}
