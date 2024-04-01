import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacebookServiceService {

  constructor(private http: HttpClient) { }

  publishToFacebookPage(message: string, pageId: string, accessToken: string): Observable<any> {
    const url = `https://graph.facebook.com/v12.0/${pageId}/feed`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.post(url, { message }, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Unknown error occurred';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
