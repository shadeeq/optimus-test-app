export interface StoreItem {
  group: GroupDescriptionsState;
  measurements: MeasurementsState;
  managements: ManagementState;
}

export interface GroupDescriptionsState {
  descriptions: string[];
  selectedDescription: string;
}

export interface MeasurementsState {
  measurements: string[];
  selectedMeasurement: string;
}

export interface ManagementState {
  managements: Management[];
}

export interface Management {
  externalMiId: number;
  kpiGroupType: string;
  kpiGroupDescription: string;
  kpiMeasurementDescription: string;
  kpiTeamName: string;
  kpiUserName: string;
  kpiPeriod: string;
  kpiAchievementPercent: number;
  kpiAchievementAmount: number;
  kpiRating: string;
  kpiColor: string;
}
