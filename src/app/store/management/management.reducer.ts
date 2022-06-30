import { Action, createReducer, on } from "@ngrx/store";
import * as ManagementActions from './management.actions';
import { ManagementState } from "../../models/store-interface";

const initialState: ManagementState = {
  managements: []
};

const _managementReducer = createReducer(
  initialState,
  on(ManagementActions.loadManagements, (state, {managements}) => ({
    ...state,
    managements
  })),
);

export function managementReducer(state: ManagementState = initialState, action: Action) {
  return _managementReducer(state, action);
}
