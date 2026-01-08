import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateComponentReq, SearchComponentReqWithPagination } from '../../dto/component/component-req';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../api/api-response';
import { SearchComponentRes } from '../../dto/component/search-component-res';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'http://localhost:8080/api/pmh-components';

  public fetchComponents(payload: SearchComponentReqWithPagination): Observable<ApiResponse<SearchComponentRes>> {
    return this.httpClient.post<ApiResponse<SearchComponentRes>>(`${this.API_URL}/search`, payload);
  }

  public createComponent(payload: CreateComponentReq): Observable<HttpResponse<ApiResponse<any>>> {
    return this.httpClient.post<ApiResponse<any>>(`${this.API_URL}`, payload, { observe: 'response' });
  }
}
