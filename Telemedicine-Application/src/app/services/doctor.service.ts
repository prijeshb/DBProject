
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  server_url = environment.serverUrl;
  constructor(private http: HttpClient) { }

  getDoctor(email){
    return this.http.get(this.server_url + `doctor/${email}`); 
    // ((res:Response) => res.json());
  }
  updateDocData(docData){
     return this.http.post(this.server_url + `doctor/${docData.doctor_emailID}`,{...docData});
  }
  getAllDoctors(){
    return this.http.get(this.server_url+ "doctor/all/")
  }
  
}

