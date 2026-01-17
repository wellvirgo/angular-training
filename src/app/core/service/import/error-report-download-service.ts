import { HttpClient, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class ErrorReportDownloadService {
    private readonly BASE_API_URL = 'http://localhost:8080/api/error-reports';

    httpClient = inject(HttpClient);

    public downloadErrorReport(fileName: string): Observable<HttpResponse<Blob>> {
        return this.httpClient.get(`${this.BASE_API_URL}/${fileName}`, {
            observe: 'response',
            responseType: 'blob',
        });
    }
}