import { createAction, props } from "@ngrx/store";

export const loadMeasurements = createAction(
  '[Measurements] Load Measurements',
  props<{measurements: string[]}>()
);

export const setMeasurement = createAction(
  '[Measurements] Set Measurements',
  props<{selectedMeasurement: string}>()
);
