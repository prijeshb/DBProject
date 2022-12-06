import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  server_url = environment.serverUrl;
  constructor(private http: HttpClient) { }
  
  getAllConsultations(patientId){
    return this.http.get(this.server_url + `consultation/${patientId}/all`)
  }
  updateConsultation(consultData){
    return this.http.post(this.server_url + `consultation/update/10`,{...consultData})
  }
}
