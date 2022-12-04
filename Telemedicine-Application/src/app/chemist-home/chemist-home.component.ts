import { Component, OnInit } from '@angular/core';
import { ChemistService } from '../services/chemist.service';

@Component({
  selector: 'app-chemist-home',
  templateUrl: './chemist-home.component.html',
  styleUrls: ['./chemist-home.component.css']
})
export class ChemistHomeComponent implements OnInit {
  chemistName:string;
  pharmacyEmail:string;
  pharmacyName: string;
  pharmacyAddress: string;
  pharmacyPhoneNmber: string;
  isDoctorDisplay: string;

  constructor(private chemistService: ChemistService) { }

  ngOnInit() {
    this.isDoctorDisplay = "Chemist";
    this.chemistName ="sdvdvs";

    this.chemistDetails();
  }
  isMenuOpen = true;
  contentMargin = 240;

  onToolbarMenuToggle() {
    console.log('On toolbar toggled', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }
  chemistDetails(){
    let chemist = this.chemistService.getChemist(localStorage.getItem('displayemail'));
    chemist.subscribe(data => {
      if(data.chemist){
        this.chemistName = data.chemist[0].chemist_firstName + " " + data.chemist[0].chemist_lastName;
        localStorage.setItem('chemistName', this.chemistName);
        this.pharmacyEmail = data.chemist[0].pharmacy_emailID;
        this.pharmacyName = data.chemist[0].pharmacy_name;
        this.pharmacyAddress = data.chemist[0].pharmacy_address;
        this.pharmacyPhoneNmber = data.chemist[0].pharmacy_phoneNumber;
      }
    })
  }

}
