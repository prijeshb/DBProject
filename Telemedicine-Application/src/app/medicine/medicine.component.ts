import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import  { MedicineService} from '../services/medicine.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  userType : string;
  medName: string;
  medPrice: string;
  medExpiryDate: string;
  medQuantity : string;
  chemistName : string;
  isDoctorDisplay: string;
  
  constructor(private medicineService: MedicineService,
    public authService: AuthService ) { }

  ngOnInit() {
    this.userType = localStorage.getItem('userType');
    this.chemistName = localStorage.getItem('chemistName');
    this.isDoctorDisplay = "Chemist";
    this.medExpiryDate = "";
    this.medName = "";
    this.medPrice = "";
    this.medQuantity = "";
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
  addMedData(medname, medprice, medexpirydate, medquantity){
    console.log(medexpirydate)
    this.medicineService.updateMedData({
      medicine_name : medname,
      medicine_price: medprice,
      medicine_expiryDate: medexpirydate,
      medicine_quantity: medquantity
    }).subscribe((data)=> {
      console.log("data updated")
    })
  }
}
