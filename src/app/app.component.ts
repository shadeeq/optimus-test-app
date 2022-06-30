import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, pluck, Subject, takeUntil } from "rxjs";
import { DropDownListComponent } from "@progress/kendo-angular-dropdowns";
import * as GroupsActions from './store/groups/groups.actions';
import * as MeasurementsActions from './store/measurements/measurements.actions';
import * as ManagementActions from './store/management/management.actions';
import { GroupDescriptionsState, Management, ManagementState, MeasurementsState } from "./models/store-interface";
import { LOADER_PROVIDER, LOADER_TOKEN } from "./providers/loader-provider";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LOADER_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public groupsDescriptions$: Observable<string[]>;
  public measurements$: Observable<string[]>;
  public managements$: Observable<Management[]>;
  private unsubscribe$ = new Subject<boolean>();

  @ViewChild('measurements') measurementsDropdown!: DropDownListComponent;

  constructor(
    private groupsStore: Store<{group: GroupDescriptionsState}>,
    private measurementsStore: Store<{measurements: MeasurementsState}>,
    private managementsStore: Store<{managements: ManagementState}>,
    @Inject(LOADER_TOKEN) readonly isLoading$: Observable<boolean>
  ) {

    this.groupsDescriptions$ = groupsStore.select('group').pipe(
      takeUntil(this.unsubscribe$),
      pluck('descriptions')
    );

    this.measurements$ = measurementsStore.select('measurements').pipe(
      takeUntil(this.unsubscribe$),
      pluck('measurements'),
    );

    this.managements$ = managementsStore.select('managements').pipe(
      takeUntil(this.unsubscribe$),
      pluck('managements')
    );

  }

  ngOnInit(): void {
    this.groupsStore.dispatch(GroupsActions.loadGroupDescriptions());
  }

  setDescription(selectedDescription: string): void {
    this.measurementsDropdown.reset();
    this.groupsStore.dispatch(GroupsActions.setGroupDescriptions({selectedDescription}));
  }

  setMeasurement(selectedMeasurement: string): void {
    this.measurementsStore.dispatch(MeasurementsActions.setMeasurement({selectedMeasurement}));
  }

  getManagements(): void {
    this.managementsStore.dispatch(ManagementActions.getManagements());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
