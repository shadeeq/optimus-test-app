import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, pluck } from "rxjs";
import { apis } from "../../environments/apis";
import { Management } from "../models/store-interface";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  getManagements$ = new BehaviorSubject(false);

  constructor( private http: HttpClient ) {
  }

  loadGroupsDescriptions(): Observable<string[]> {
    return this.http.get<string[]>(`${apis.baseUrl}${apis.groupDescriptions}`)
  }

  loadMeasurements(selectedDescription: string): Observable<string[]> {
    const params = new HttpParams().set('groupdescription', selectedDescription);

    return this.http.get<string[]>(`${apis.baseUrl}${apis.measurementDescriptions}`, { params });
  }

  getManagementInfo(groupDescription: string, measurementDescription: string): Observable<Management[]> {
    const params = new HttpParams()
      .set('grouptype', 'summary')
      .set('groupdescription', groupDescription)
      .set('measurementdescription', measurementDescription)
      .set('resultrows', '99')

    return this.http.get<{ results: Management[]}>(apis.baseUrl, { params })
      .pipe(
        pluck('results'),
      );
  }

}
