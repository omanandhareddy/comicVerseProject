import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

 private overviewCardSubject = new BehaviorSubject<any>(null);
  overviewCard$ = this.overviewCardSubject.asObservable();

  addOverView(selectedComicOver: any): void {
    if (selectedComicOver) {
      this.overviewCardSubject.next(selectedComicOver);
    }
  }
}
