import { Component, OnInit } from '@angular/core';
import { ChemistService } from '../services/chemist.service';
import { MedicineService } from '../services/medicine.service';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from '../auth.service';
export interface medicineData {
  id: string;
  name: string;
  expiryDate : string;
  quantity :  string;
  price: string;
};

var ELEMENT_DATA: medicineData[] = [
];
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
  medicineData: medicineData[] = [];
  displayedColumns: string[] = ['id', 'name','price','quantity','expiryDate'];
  // dataSource: any[];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private chemistService: ChemistService,
    private medicineService : MedicineService,
    public authService: AuthService,) { }

  ngOnInit() {
    this.isDoctorDisplay = "Chemist";
    this.chemistName ="sdvdvs";
    // this.authService = authService;
    this.chemistDetails();
    this.getAllMedicineData();
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
  getAllMedicineData(){
    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    let medData = this.medicineService.getAllMedicineData();
    medData.subscribe(data => {
      if(data.medicine){
        data.medicine.map(medata => {
          this.medicineData.push({
            // const = ;
            id: medata.medicine_id,
            name: medata.medicine_name,
            quantity : medata.medicine_quantity,
            expiryDate:`${new Date(medata.medicine_expiryDate).getFullYear()}/${new Date(medata.medicine_expiryDate).getMonth()}/${new Date(medata.medicine_expiryDate).getDate()}`,
            price: medata.medicine_price
          })
        })
        this.medicineData.map(data => {
          ELEMENT_DATA.push(data)
          // console.log(ELEMENT_DATA)
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        })

        console.log(this.dataSource)
      }
    })
  }
  

}
