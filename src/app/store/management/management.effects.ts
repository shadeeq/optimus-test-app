import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { HttpClientService } from "../../services/http-client.service";
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  EMPTY,
  map,
  switchMap,
  tap
} from "rxjs";
import * as ManagementActions from '../management/management.actions';
import { LoaderService } from "../../services/loader.service";
import { Management, StoreItem } from "../../models/store-interface";

@Injectable()
export class ManagementEffects {

  constructor(
    private actions$: Actions,
    private store: Store<StoreItem>,
    private httpService: HttpClientService,
    private loaderService: LoaderService
  ) {
  }

  loadManagements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ManagementActions.getManagements),
      switchMap(() => {
        this.httpService.getManagements$.next(true);
        return this.httpService.getManagements$;
      }),
      distinctUntilChanged(),
      switchMap((getManagements: boolean) => getManagements ? this.store : EMPTY),
      distinctUntilKeyChanged('measurements'),
      tap(() => this.loaderService.startLoading()),
      map((store: StoreItem) => {
        return ({
          description: store.group.selectedDescription,
          measurements: store.measurements.selectedMeasurement
        })
      }),
      switchMap(({ description, measurements }) => this.httpService.getManagementInfo(description, measurements)
        .pipe(
          tap(() => {
            this.httpService.getManagements$.next(false);
            this.loaderService.stopLoading();
          })
        )
      ),
      map((managements: Management[]) => ManagementActions.loadManagements({ managements })),
    )
  )

}
