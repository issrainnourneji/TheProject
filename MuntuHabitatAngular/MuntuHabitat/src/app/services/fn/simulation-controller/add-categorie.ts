/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Categorie } from '../../models/categorie';

export interface AddCategorie$Params {
      body: Categorie
}

export function addCategorie(http: HttpClient, rootUrl: string, params: AddCategorie$Params, context?: HttpContext): Observable<StrictHttpResponse<Categorie>> {
  const rb = new RequestBuilder(rootUrl, addCategorie.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Categorie>;
    })
  );
}

addCategorie.PATH = '/simulation/addC';
