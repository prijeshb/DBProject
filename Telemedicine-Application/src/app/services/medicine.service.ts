import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';me
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  serverl_url  = environment.serverUrl;
  constructor(private http: HttpClient) { }
  getMedicineData(medId){
    return this.http.get(this.serverl_url + `medicine/med/${medId}`);
  }
  updateMedData(medData){
    return this.http.post(this.serverl_url + `medicine/med/update`,{...medData});
  }
}
