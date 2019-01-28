import { Component, OnInit, ViewChild } from '@angular/core';
import { URL_SEARCH } from './config';
import { UserServiceService } from './user-service.service';
import { Subject, BehaviorSubject, Observable, of, combineLatest } from 'rxjs';
import { startWith, map, tap, catchError, withLatestFrom, exhaustMap } from 'rxjs/operators';
import { getRandomOffset, compbineData, mapResponse } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  URL_SEARCH = URL_SEARCH;
  refreshBtn = new Subject();
  refreshBtn$ = this.refreshBtn.asObservable();
  widgetElemRefresh = new Subject();
  widgetElemRefresh$ = this.widgetElemRefresh.asObservable().pipe(startWith(null));
  prevRenderState = new BehaviorSubject([]);
  prevRenderState$ = this.prevRenderState.asObservable();
  reqestUrlStream$: Observable<string>;
  reqestStream$: Observable<any>;
  users$: Observable<any>;

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.reqestUrlStream$ = this.refreshBtn$.pipe(
      startWith(null),
      map(() => {
        return this.URL_SEARCH + getRandomOffset();
      })
    );

    this.reqestStream$ = this.reqestUrlStream$.pipe(
      exhaustMap(url => this.userService.getUsers(url)),
      tap(() => this.prevRenderState.next([])),
      catchError(error => {
        console.error(error);
        this.prevRenderState.next([]);
        return of([]);
      })
    );

    this.users$ = combineLatest(
      this.reqestStream$,
      this.widgetElemRefresh$,
      (response, refreshItemId) => ({ response, refreshItemId })).pipe(
        withLatestFrom(this.prevRenderState$),
        map(compbineData),
        map(mapResponse),
        tap(data => this.prevRenderState.next(data))
      );
  }

  onRefreshAll(): void {
    this.refreshBtn.next();
  }

  onRefreshOne(id: number): void {
    this.widgetElemRefresh.next(id);
  }
}
