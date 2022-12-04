import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../patient'
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  server_url = environment.serverUrl;
  constructor(private http: HttpClient) { }

  getPatient(displayemail){
    return this.http.get<Patient>(this.server_url + `patient/${displayemail}`); 
    // ((res:Response) => res.json());
  }
  updatePatientData(patientData){
     return this.http.post(this.server_url + `patient/${patientData.email}`,{...patientData});
  }
  
}
