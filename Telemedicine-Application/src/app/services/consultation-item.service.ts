
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultationItemService {
  server_url = environment.serverUrl;
  constructor(private http: HttpClient) { }
  
  getConsultationItem(consultId){
    return this.http.get(this.server_url + `consultationItem/item/${consultId}`)
  }
  updateConsultationItem(consultationData){
    return this.http.post(this.server_url + `consultationItem/item`,{...consultationData})
  }
}
