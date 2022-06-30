import { InjectionToken, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { LoaderService } from "../services/loader.service";

export const LOADER_TOKEN = new InjectionToken('Loader Provider');

export const LOADER_PROVIDER: Provider[] = [
  {
    provide: LOADER_TOKEN,
    useFactory: loaderFactory,
    deps: [LoaderService]
  }
];

export function loaderFactory(loaderService: LoaderService): Observable<boolean> {
  return loaderService.isLoading();
}
