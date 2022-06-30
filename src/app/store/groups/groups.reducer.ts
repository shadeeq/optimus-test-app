import { Action, createReducer, on } from "@ngrx/store";
import * as groupsActions from './groups.actions';
import { GroupDescriptionsState } from "../../models/store-interface";


export const initialState: GroupDescriptionsState = {
  descriptions: [],
  selectedDescription: ''
};

const _groupsReducer = createReducer(
  initialState,
  on(groupsActions.getGroupDescriptions, (state, {descriptions}) => ({
    ...state,
    descriptions
  })),
  on(groupsActions.setGroupDescriptions, (state, {selectedDescription}) => {
    return ({
      ...state,
      selectedDescription
    })
  })
);

export function groupsReducer(state: GroupDescriptionsState = initialState, action: Action) {
  return _groupsReducer(state, action);
}
