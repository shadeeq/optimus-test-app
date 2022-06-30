import { createAction, props } from "@ngrx/store";

export const getGroupDescriptions = createAction(
  '[Groups] Get Descriptions',
  props<{ descriptions: string[] }>()
);
export const setGroupDescriptions = createAction(
  '[Groups] Set Descriptions',
  props<{ selectedDescription: string }>()
);
export const loadGroupDescriptions = createAction(
  '[Groups] Load Descriptions'
);
