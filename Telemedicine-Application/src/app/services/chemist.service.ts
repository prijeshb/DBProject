

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChemistService {
  server_url = environment.serverUrl;
  constructor(private http: HttpClient) { }

  getChemist(chemistemail){
    return this.http.get(this.server_url + `chemist/pharmacy/${chemistemail}`); 
    // ((res:Response) => res.json());
  }
  updateChemistData(chemistData){
     return this.http.post(this.server_url + `chemist/pharmacy/${chemistData.pharmacy_emailID}`,{...chemistData});
  }
  getAllChemists(){
    return this.http.get(this.server_url + "chemist/allchemist")
  }
  
}