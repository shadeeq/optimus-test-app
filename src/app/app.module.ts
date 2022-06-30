import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonModule } from "@progress/kendo-angular-buttons";

import { AppComponent } from './app.component';
import { AuthInterceptor } from "./interceptors/auth.interceptor";

import { GroupsEffects } from "./store/groups/groups.effects";
import { MeasurementsEffects} from "./store/measurements/measurements.effects";
import { ManagementEffects } from "./store/management/management.effects";
import { managementReducer } from "./store/management/management.reducer";
import { groupsReducer } from "./store/groups/groups.reducer";
import { measurementsReducer } from "./store/measurements/measurements.reducer";


const REDUCERS = {
  group: groupsReducer,
  measurements: measurementsReducer,
  managements: managementReducer
};

const EFFECTS = [GroupsEffects, MeasurementsEffects, ManagementEffects];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(REDUCERS),
    EffectsModule.forRoot(EFFECTS),
    DropDownsModule,
    BrowserAnimationsModule,
    GridModule,
    ButtonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
