import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BatchingUpdateComponentStatusReq, CreateComponentReq, SearchComponentReq, SearchComponentReqWithPagination, UpdateComponentReq } from '../../dto/component/component-req';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../api/api-response';
import { SearchComponentRes } from '../../dto/component/search-component-res';
import { FullComponentRes } from '../../dto/component/component-res';
import { IS_PUBLIC_API } from '../auth/auth-service';
import { ImportComponentRes } from '../../dto/component/import-res';
import { IStatus } from '../../enums/component-status.enum';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  private httpClient = inject(HttpClient);

  private haveImported_ = signal(false);
  public readonly haveImported = computed(() => this.haveImported_());

  private readonly API_URL = 'http://localhost:8080/api/pmh-components';

  public fetchComponents(payload: SearchComponentReqWithPagination): Observable<ApiResponse<SearchComponentRes>> {
    return this.httpClient.post<ApiResponse<SearchComponentRes>>(`${this.API_URL}/search`, payload, {
      context: new HttpContext().set(IS_PUBLIC_API, true)
    });
  }

  public createComponent(payload: CreateComponentReq): Observable<HttpResponse<ApiResponse<any>>> {
    return this.httpClient.post<ApiResponse<any>>(`${this.API_URL}`, payload, { observe: 'response' });
  }

  public fetchComponentById(id: number): Observable<ApiResponse<FullComponentRes>> {
    return this.httpClient.get<ApiResponse<FullComponentRes>>(`${this.API_URL}/${id}`);
  }

  public updateComponent(id: number, payload: UpdateComponentReq): Observable<HttpResponse<ApiResponse<any>>> {
    return this.httpClient.put<ApiResponse<any>>(`${this.API_URL}/${id}`, payload, { observe: 'response' });
  }

  public deleteComponent(id: number): Observable<HttpResponse<ApiResponse<void>>> {
    return this.httpClient.delete<ApiResponse<void>>(`${this.API_URL}/${id}`, { observe: 'response' });
  }

  public exportComponentsToExcel(payload: SearchComponentReq): Observable<HttpResponse<Blob>> {
    return this.httpClient.post(`${this.API_URL}/export`, payload, {
      observe: 'response',
      responseType: 'blob'
    });
  }

  public importComponentsFromExcel(file: File): Observable<ApiResponse<ImportComponentRes>> {
    const formData = new FormData();
    formData.append('excel', file);
    return this.httpClient.post<ApiResponse<ImportComponentRes>>(`${this.API_URL}/import`, formData);
  }

  public getAllComponentStatuses(): Observable<ApiResponse<IStatus[]>> {
    return this.httpClient.get<ApiResponse<IStatus[]>>(`${this.API_URL}/statuses`);
  }

  public batchUpdateComponentStatus(payload: BatchingUpdateComponentStatusReq): Observable<ApiResponse<number>> {
    return this.httpClient.patch<ApiResponse<number>>(`${this.API_URL}/statuses`, payload);
  }

  public dowloadFile(data: Blob, fileName: string, type: string): void {
    const blob = new Blob([data], { type: type })
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  public changeHaveImported(value: boolean): void {
    this.haveImported_.update(() => value);
  }
}
