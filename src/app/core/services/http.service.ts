import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient : HttpClient) { }

  serverURL = "https://ccitr.emeetify.com/strapi/";


  getMethod(path: string) {
    return new Promise(async (resolve, reject) => {
      this.httpClient.get(this.serverURL + path).subscribe((data: any) => {
          resolve(data);
      }, (error:any) => {
        reject(error);
      });
    });
  }
}
