import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as MeasurementsActions from './measurements.actions';
import { distinctUntilChanged, map, pluck, switchMap } from "rxjs";
import { HttpClientService } from "../../services/http-client.service";
import * as GroupsActions from "../groups/groups.actions";
import { Store } from "@ngrx/store";
import { GroupDescriptionsState } from "../../models/store-interface";

@Injectable()
export class MeasurementsEffects {

  constructor(
    private actions$: Actions,
    private httpService: HttpClientService,
    private store: Store<{group: GroupDescriptionsState}>
  ) {
  }

  setMeasurements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.setGroupDescriptions),
      switchMap(() => this.store.select('group')
        .pipe(
          pluck('selectedDescription'),
        )
      ),
      distinctUntilChanged(),
      switchMap(selectedDescription => this.httpService.loadMeasurements(selectedDescription).pipe(
        map(measurements => MeasurementsActions.loadMeasurements({measurements})),
      ))
    )
  )
}
