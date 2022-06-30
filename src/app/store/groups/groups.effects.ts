import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { HttpClientService } from "../../services/http-client.service";
import * as GroupsActions from './groups.actions';


@Injectable()
export class GroupsEffects {

  constructor(
    private actions$: Actions,
    private httpClientService: HttpClientService,
  ) { }

  loadGroupsDescriptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.loadGroupDescriptions),
      switchMap(() => this.httpClientService.loadGroupsDescriptions()
        .pipe(
          map(descriptions => GroupsActions.getGroupDescriptions({ descriptions })),
        )
      )
    )
  );
}
