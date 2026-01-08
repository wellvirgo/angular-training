import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../api/api-response';
import { MessageTypeRes } from '../../dto/message-type/message-type-res';

@Injectable({
  providedIn: 'root',
})
export class MessageTypeService {
  private readonly BASE_URL = 'http://localhost:8080/api/message-types';
  private httpClient = inject(HttpClient);

  public getMessageTypes(status: number): Observable<ApiResponse<MessageTypeRes[]>> {
    return this.httpClient.get<ApiResponse<MessageTypeRes[]>>(`${this.BASE_URL}?status=${status}`);
  }
}
