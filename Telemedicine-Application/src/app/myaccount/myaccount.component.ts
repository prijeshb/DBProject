import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatListModule } from '@angular/material/list'
import { MatInputModule, MatInput } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { NgModule } from '@angular/core'
import { PatientService} from '../services/patient.service'
import { DoctorService } from '../services/doctor.service';
import { ChemistService } from '../services/chemist.service';
import { Doctor } from '../doctor';
import { Patient } from '../patient';

@NgModule ({
  exports: [
    MatInputModule,
    MatListModule,
    MatMenuModule
  ]
})

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  displayemail: string;
  displayuid: string;
  firstNameDisplay: string;
  lastNameDisplay: string;
  age: string;
  addressDisplay:string;
  phoneNumber: string;
  salary: string;
  isDoctorDisplay:string;
  surname: string;
  isDoctor: boolean;
  user: string;
  specialization :string;
  totalEarnings : string;
  doctor_fees  : string;
  doctor_availability : string;
  pharmacy_name : string;
  userType : string;




  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,   // Inject Firestore service
    private  patientService : PatientService,
    private doctorService  : DoctorService,
    private chemistService : ChemistService
  ) {
  }
 
  
  ngOnInit() {

    // try {
    //   this.displayuid = this.afAuth.auth.currentUser.uid
    //   localStorage.setItem("displayuid", this.displayuid);
    //   console.log(this.displayuid);
    // } catch (error) {
    //   this.displayuid = localStorage.getItem("displayuid");
    //   console.log(this.displayuid);
    // }
 
    this.userType = localStorage.getItem('userType');

    try {
      this.displayemail = this.afAuth.auth.currentUser.email
      localStorage.setItem("displayemail", this.displayemail);
      console.log(this.displayemail);
    } catch (error) {
      this.displayemail = localStorage.getItem("displayemail");
      console.log(this.displayemail);
    }

    // fetch user's data
    this.fetchuserdata()

  }

  fetchuserdata() {
    console.log('calling patient')
    // const userType = localStorage.getItem("userType");
    if(this.userType == "Patient"){
      let user = this.patientService.getPatient(this.displayemail);

      user.subscribe(pdata =>{
        console.log("pdata",pdata)
        if(pdata && pdata.patient[0] &&pdata.patient[0].patient_id){
          this.displayuid = pdata.patient[0].patient_id;
          this.firstNameDisplay = pdata.patient[0].patient_firstName;
          this.lastNameDisplay = pdata.patient[0].patient_lastName;
          this.addressDisplay = pdata.patient[0].patient_address;
          this.age = pdata.patient[0].patient_age;
          this.phoneNumber = pdata.patient[0].patient_phoneNumber;
          this.salary = pdata.patient[0].patient_salary;
          this.user = "0";
    
        }
      })   
    }
    if(this.userType == "Doctor"){
      let user = this.doctorService.getDoctor(this.displayemail);

      user.subscribe(pdata =>{
        console.log("pdata",pdata)
        if(pdata && pdata.doctor[0] &&pdata.doctor[0].doctor_id){
          this.displayuid = pdata.doctor[0].doctor_id;
          this.firstNameDisplay = pdata.doctor[0].doctor_firstName;
          this.lastNameDisplay = pdata.doctor[0].doctor_lastName;
          this.addressDisplay = pdata.doctor[0].doctor_address;
          this.doctor_fees = pdata.doctor[0].doctor_fees;
          this.phoneNumber = pdata.doctor[0].doctor_phoneNumber;
          this.specialization = pdata.doctor[0].doctor_specialization;
          this.totalEarnings = pdata.doctor[0].total_earnings;
          this.doctor_availability = pdata.doctor[0].doctor_availability;
          this.user = "1";
    
        }
      })   
    }
    if(this.userType == "Chemist"){
      let user = this.chemistService.getChemist(this.displayemail);

      user.subscribe(pdata =>{
        console.log("pdata",pdata)
        if(pdata && pdata.chemist[0] &&pdata.chemist[0].chemist_id){
          this.displayuid = pdata.chemist[0].chemist_id;
          this.displayemail = 
          this.firstNameDisplay = pdata.chemist[0].chemist_firstName;
          this.lastNameDisplay = pdata.chemist[0].chemist_lastName;
          this.addressDisplay = pdata.chemist[0].pharmacy_address;
          this.pharmacy_name = pdata.chemist[0].pharmacy_name;
          this.phoneNumber = pdata.chemist[0].pharmacy_phoneNumber;
          // this.salary = pdata.patient[0].patient_salary;
          this.user = "2";
    
        }
      })   
    }
    // if(pdata && pdata.doctor[0] && pdata.doctor[0].doctor_id){

    //       this.isDoctorDisplay = "Doctor";
    //       this.surname = "Dr. "
    //       this.isDoctor = true;
    //       this.user = "1";
    // }
    // if(pdata && pdata.chemist[0] && pdata.chemist[0].chemist_id){
    //   this.user = "2";
    // }

    // this.dobDisplay = doc.data().dateofbirth;
    // this.addressDisplay = doc.data().address;
    // this.insuranceCompanyDisplay = doc.data().insurancecompany;
    // this.insuranceIdDisplay = doc.data().insuranceid;
  // })
  // var docRef = this.afs.collection('users').doc(this.displayuid);
  // docRef.get().toPromise().then((doc) => {
  //   if (doc.exists) {
  //       this.firstNameDisplay = doc.data().firstName;
  //       this.lastNameDisplay = doc.data().lastName;
  //       this.dobDisplay = doc.data().dateofbirth;
  //       this.addressDisplay = doc.data().address;
  //       this.insuranceCompanyDisplay = doc.data().insurancecompany;
  //       this.insuranceIdDisplay = doc.data().insuranceid;
  //       if (doc.data().isDoctor == true) {
  //         this.isDoctorDisplay = "Doctor";
  //         this.surname = "Dr. "
  //         this.isDoctor = true;
  //       } else {
  //         this.isDoctor = false;
  //         this.isDoctorDisplay = "Patient";
  //       }
  //   } else {
  //       console.log("No such document!");
  //   }
  //   }).catch(function(error) {
  //     console.log("Error getting document:", error);
  //   });
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
  addData(firstName, lastName, age, address, salary, phoneNumber) {
    // this.afs.collection('users').doc(this.afAuth.auth.currentUser.uid).update({
      this.patientService.updatePatientData({
      patient_id: this.displayuid,
      email: this.afAuth.auth.currentUser.email,
      // displayName: this.afAuth.auth.currentUser.displayName,
      // photoURL: this.afAuth.auth.currentUser.photoURL,
      // emailVerified: this.afAuth.auth.currentUser.emailVerified,
      patient_firstName: firstName,
      patient_lastName: lastName,
      age: age,
      patient_address: address,
      patient_salary: salary,
      patient_phoneNumber: phoneNumber
    }).subscribe((data)=> {
      console.log("data updated")
    })

      // .then(function () {
      //   console.log("Data Written")
      // });
      // this.afs.collection('appointments').get().toPromise()
      // .then(querySnapshot => {
      //   querySnapshot.docs.forEach(doc => {
      //     var updatedoc = doc.data().appointment_id;
      //     if (doc.data().senderuid == this.displayuid)
      //     {
      //       this.afs.collection('appointments').doc(updatedoc).update({
      //         sender: firstName + " " + lastName,
      //       })
      //       .then(function () {
      //         console.log("Data Written")
      //       });
      //     }
      //     if (doc.data().receiveruid == this.displayuid)
      //     {
      //       this.afs.collection('appointments').doc(updatedoc).update({
      //         receiver: firstName + " " + lastName,
      //       })
      //       .then(function () {
      //         console.log("Data Written")
      //       });
      //     }
      //   });
      // })
      this.ngOnInit();
      // hi
  }
  addDataDoc(firstName, lastName, specialization, docaddress, phoneNumber, totalEarnings, doctor_fees, doctor_availability ){
    this.doctorService.updateDocData({
      // _id: this.displayuid,
      // email: this.afAuth.auth.currentUser.email,
      // displayName: this.afAuth.auth.currentUser.displayName,
      // photoURL: this.afAuth.auth.currentUser.photoURL,
      // emailVerified: this.afAuth.auth.currentUser.emailVerified,


      // doctor_emailID: this.afAuth.auth.currentUser.email,
      doctor_firstName: firstName,
      doctor_lastName: lastName,
      doctor_specialization: specialization,
      doctor_availability: doctor_availability,
      doctor_fees: doctor_fees,
      doctor_phoneNumber: phoneNumber,
      total_earnings: totalEarnings,
      doctor_address: docaddress
    }).subscribe((data)=> {
      console.log("data updated")
    })
    this.ngOnInit();
  }
  addChemistData(firstName, lastName, pharmacyname, address, phonenumber){
    this.chemistService.updateChemistData({
      pharmacy_emailID:  this.displayemail,
      chemist_firstName: firstName,
      chemist_lastName: lastName,
      pharmacy_name: pharmacyname,
      pharmacy_address: address,
      pharmacy_phoneNumber: phonenumber
    }).subscribe((data)=> {
      console.log("data updated")
    })
    this.ngOnInit();
  }
}