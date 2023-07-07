import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DalleServiceService {
  constructor(private http: HttpClient) {}

  createCharacter(prompt: string) {
    const url = 'https://api.openai.com/v1/images/generations';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer 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');

    const requestBody = {
      prompt,
      n: 1,
      size: '256x256',
    };

    return this.http.post(url, requestBody, { headers });
  }
}
