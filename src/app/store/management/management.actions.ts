import { createAction, props } from "@ngrx/store";
import { Management } from "../../models/store-interface";

export const loadManagements = createAction(
  '[Managements] Load Managements',
  props<{ managements: Management[] }>()
);
export const getManagements = createAction(
  '[Managements] Get Managements'
)
