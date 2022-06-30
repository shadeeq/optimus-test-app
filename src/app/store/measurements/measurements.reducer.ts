import { Action, createReducer, on } from "@ngrx/store";
import * as MeasurementsActions from './measurements.actions';
import { MeasurementsState } from "../../models/store-interface";

export const initialState: MeasurementsState = {
  measurements: [],
  selectedMeasurement: ''
};

const _measurementsReducer = createReducer(
  initialState,
  on(MeasurementsActions.loadMeasurements, (state, {measurements}) => {
    return ({
      ...state,
      measurements
    })
  }),
  on(MeasurementsActions.setMeasurement, (state, {selectedMeasurement}) => ({
    ...state,
    selectedMeasurement
  })),
);

export function measurementsReducer(state: MeasurementsState = initialState, action: Action) {
  return _measurementsReducer(state, action);
}
