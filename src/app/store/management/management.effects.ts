import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { HttpClientService } from "../../services/http-client.service";
import {
  map,
  switchMap,
  tap,
  withLatestFrom
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
      withLatestFrom(this.store.select('group')),
      withLatestFrom(this.store.select('measurements')),
      map(([[action, group], measurements]) => {
        return ({
          description: group.selectedDescription,
          measurements: measurements.selectedMeasurement
        })
      }),
      switchMap(({ description, measurements }) => this.httpService.getManagementInfo(description, measurements)
        .pipe(
          tap(() => this.loaderService.stopLoading())
        )
      ),
      map((managements: Management[]) => ManagementActions.loadManagements({ managements })),
    )
  )

}
