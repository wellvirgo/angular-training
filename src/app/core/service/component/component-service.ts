import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SearchComponentReq } from '../../dto/component/search-component-req';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../api/api-response';
import { SearchComponentRes } from '../../dto/component/search-component-res';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  private httpClient = inject(HttpClient);

  private readonly API_URL = 'http://localhost:8080/api/pmh-components';

  public fetchComponents(payload: SearchComponentReq): Observable<ApiResponse<SearchComponentRes>> {
    return this.httpClient.post<ApiResponse<SearchComponentRes>>(`${this.API_URL}/search`, payload);
  }
}
