import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ScheduleappointmentsComponent } from '../scheduleappointments/scheduleappointments.component';
import {MatTableDataSource} from '@angular/material';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { DoctorService } from '../services/doctor.service';
import { ChemistService } from  '../services/chemist.service';
import { ConsultationService } from '../services/consultation.service';

export interface userdoc {
  whom: string;
  date: string;
  time: string;
  status: string;
  appointment_id: string;
  timestamp: string;
}

export interface userapp {
  whom: string;
  date: string;
  time: string;
  status: string;
  appointment_id: string;
}
export interface consultApt {
  patient_id : string;
  doctor_id : string;
  consultation_id: string;
  chemist_id: string;
  consultation_date: string;
}
var ELEMENT_DATA: consultApt[] = [
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayuid: string;
  firstNameDisplay: string;
  lastNameDisplay: string;
  displayemail: string;
  isDoctorDisplay:string;
  isDoctor: boolean;
  // displayedColumns: string[] = ['whom', 'date', 'time', 'status', 'cancel', 'text', 'video'];
  displayedColumns: string[] = ['patient_id', 'consultation_date'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  firstandlastname = this.lastNameDisplay + " " + this.firstNameDisplay;
  surname: string;
  doctors:string[] = [];
  patients:string[] = [];
  appointment_id: string;
  currentdate = this.datePipe.transform(new Date(), "M/dd/yyyy");
  appointmentdoc:userdoc[] = [];

  fileNameDialogRef: MatDialogRef<ScheduleappointmentsComponent>;

  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,   // Inject Firestore service
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private snackbar: MatSnackBar,
    private route: Router,
    private   patientService: PatientService,
    private doctorService : DoctorService,
    private chemistService : ChemistService,
    private consultationService:  ConsultationService
  ) {
  }

  ngOnInit() {

    try {
      this.displayemail = this.afAuth.auth.currentUser.email;
      localStorage.setItem("displayemail", this.displayemail);
    } catch (error) {
      this.displayemail = localStorage.getItem("displayemail");
    }
    // Fetch user's data
    this.fetchuserdata()

    // Fetch all appointments for the user when opening or refreshing the page.
    this.fetchappointments()

    this.testFunction()

  }

  testFunction() {
    var date = new Date();
    var date2 = new Date("12/20/2019 08:00")
    console.log(date.toUTCString());
    console.log(date2.toUTCString());
    if (date > date2) {
      console.log("date is greater")
    } else {
      console.log("date2 is greater")
    }
  }

    fetchuserdata() {
    // Retrieve user data
     const userType = localStorage.getItem("userType");
    if(userType == "Patient"){
      // console.log("svsddfvfdbafa")
      let user = this.patientService.getPatient(this.displayemail);
      user.subscribe(data => {
        if (data) {
          this.displayuid = data.patient[0].patient_id;
          localStorage.setItem('displayuid',this.displayuid)
          this.firstNameDisplay = data.patient[0].patient_firstName;
          this.lastNameDisplay = data.patient[0].patient_LastName;
          // if (doc.data().isDoctor == true) {
          //   this.isDoctorDisplay = "Doctor";
          //   this.surname = "Dr. "
          //   this.isDoctor = true;
          // } else {
            this.isDoctorDisplay = "Patient";
            this.isDoctor = false;
          // }
      } else {
          console.log("No such document!");
      }
  })
    }
    if(userType == "Doctor"){
      // console.log("svsddfvfdbafa")
      let user = this.doctorService.getDoctor(this.displayemail);
      user.subscribe(data => {
        if (data) {
          // this.dis
          this.firstNameDisplay = data.doctor[0].doctor_firstName;
          this.lastNameDisplay = data.doctor[0].doctor_LastName;
          // if (doc.data().isDoctor == true) {
            this.isDoctorDisplay = "Doctor";
            this.surname = "Dr. "
            this.isDoctor = true;
          // } else {
            // this.isDoctorDisplay = "Patient";
            // this.isDoctor = false;
          // }
      } else {
          console.log("No such document!");
      }
    })
  }
    if(userType == "Chemist"){
      let user = this.chemistService.getChemist(this.displayemail);
      user.subscribe(data => {
        if (data) {
          // this.dis
          this.firstNameDisplay = data.chemist[0].chemist_firstName;
          this.lastNameDisplay = data.chemist[0].chemist_lastName;
          // if (doc.data().isDoctor == true) {
            this.isDoctorDisplay = "Chemist";
            // this.surname = "Dr. "
            // this.isDoctor = true;
          // } else {
            // this.isDoctorDisplay = "Patient";
            // this.isDoctor = false;
          // }
      } else {
          console.log("No such document!");
      }
    })    
    }


  //   var docRef = this.afs.collection('users').doc(this.displayuid);
  //   docRef.get().toPromise().then((doc) => {
  //     if (doc.exists) {
  //         this.firstNameDisplay = doc.data().firstName;
  //         this.lastNameDisplay = doc.data().lastName;
  //         if (doc.data().isDoctor == true) {
  //           this.isDoctorDisplay = "Doctor";
  //           this.surname = "Dr. "
  //           this.isDoctor = true;
  //         } else {
  //           this.isDoctorDisplay = "Patient";
  //           this.isDoctor = false;
  //         }
  //     } else {
  //         console.log("No such document!");
  //     }
  // }).catch(function(error) {
  //     console.log("Error getting document:", error);
  // });
  }

  // This method will fetch all appointments
  fetchappointments () {
    // Clear the table when refreshing or going back to the page.
    ELEMENT_DATA = [];
    this.appointmentdoc = [];
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.displayuid = localStorage.getItem('displayuid')
    // Loop to find and update the home page with all appointments relevant to the user.
    const currentdate = this.datePipe.transform(new Date(), "M/dd/yyyy");
    const consultations = this.consultationService.getAllConsultations(this.displayuid);
    consultations.subscribe(data => {
      let consultapts;
      if(data.consultApts && data.consultApts.length > 1){
        // let consultapts   = data.consultApts.map(apt => {...apt, Date(apt.)})
        consultapts = data.consultApts.sort((a,b) => new Date(a.consultation_date) < new Date(b.consultation_date)  ? -1 : new Date(a.consultation_date) > new Date(b.consultation_date) ?1 : 0 );
    }else
    {
      consultapts = data.consultApts
    }
        
      console.log(consultapts)
      consultapts.map(apt => {
        ELEMENT_DATA.push({
          patient_id:apt.patient_id,
          chemist_id: apt.chemist_id,
          consultation_date: apt.consultation_date,
          consultation_id: apt.consultation_id,
          doctor_id : apt.doctor_id

        })
        console.log(ELEMENT_DATA)
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        console.log(this.dataSource)
      })

      

    })
    // this.afs.collection('appointments').get().toPromise()
    // .then(querySnapshot => {
    //   querySnapshot.docs.forEach(doc => {
    //     // Import the current date and compare it to the current date.
    //     var date = this.datePipe.transform(doc.data().Date, "M/dd/yyyy");
    //     // If the appointment is outdated, then delete it.
    //     if (date < currentdate) {
    //       this.afs.collection('appointments').doc(doc.data().appointment_id).delete().then(function() {
    //         console.log("Found and deleted outdated documents.");
    //       }).catch(function(error) {
    //         console.error("Error removing document: ", error);
    //       });
    //       // If the document is not outdated, add it to the list for the user to see.
    //     } else {
    //       // If you are the sender
    //       var apptstatus = "Cancelled"
    //       if (doc.data().senderuid == this.displayuid) {
    //         if (doc.data().isActive == true)
    //         {
    //           apptstatus = "Active"
    //         }
    //         if (this.isDoctor == false)
    //         {
    //           var test = {whom: "Dr. " + doc.data().receiver, date: date, time: doc.data().Time, status: apptstatus, appointment_id: doc.data().appointment_id, timestamp: doc.data().timestamp};
    //         } else {
    //           var test = {whom: "" + doc.data().receiver, date: date, time: doc.data().Time, status: apptstatus, appointment_id: doc.data().appointment_id, timestamp: doc.data().timestamp};
    //         }
    //         //ELEMENT_DATA.push(test);
    //         this.appointmentdoc.push(test);
    //         //this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    //         }
    //       // If you are the receiver
    //       if (doc.data().receiveruid == this.displayuid) {
    //         if (doc.data().isActive == true)
    //         {
    //           apptstatus = "Active"
    //         }
    //         if (this.isDoctor == true)
    //         {
    //           var test = {whom: "" + doc.data().sender, date: date, time: doc.data().Time, status: apptstatus, appointment_id: doc.data().appointment_id, timestamp: doc.data().timestamp};
    //         } else {
    //           var test = {whom: "Dr. " + doc.data().sender, date: date, time: doc.data().Time, status: apptstatus, appointment_id: doc.data().appointment_id, timestamp: doc.data().timestamp};
    //         }
    //           //ELEMENT_DATA.push(test);
    //           this.appointmentdoc.push(test);
    //           //this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    //         } 
    //         }
    //       });
    //       console.log(this.appointmentdoc)
    //       //this.appointmentdoc = this.appointmentdoc.sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0)
    //       this.appointmentdoc = this.appointmentdoc.sort((a, b) => a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0)
    //       for (var i = 0; i < this.appointmentdoc.length; i++)
    //       {
    //         ELEMENT_DATA.push(this.appointmentdoc[i])
    //         this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    //       }
    //     });
    }

    refresh() {
    this.fetchappointments();
    }

  openAddFileDialog() {
    if ((this.firstNameDisplay == null || this.lastNameDisplay == null || this.firstNameDisplay == "" || this.lastNameDisplay == "")) {
      this.fileNameDialogRef = this.dialog.open(ScheduleappointmentsComponent);
    } else {
      this.snackbar.open("Please add a first and/or last name in My Account before scheduling an appointment!", 'Dismiss', {duration: 3000});
    }
  }

  // This will be the button that goes to the current open appointment.,
  goToVideoAppointment() { 
    this.route.navigate(['/videocall']);
  }

  goToTextAppointment() {
    this.route.navigate(['/chatbox']);
  }

  // This method cancels the currently selected appointment.
//   async cancelAppointment(whom, date, time, status) { 
//     for (var i = 0; i < ELEMENT_DATA.length; i++) {
//       if (ELEMENT_DATA[i].whom == whom && ELEMENT_DATA[i].date == date && ELEMENT_DATA[i].time == time && ELEMENT_DATA[i].status == status) {
//         this.afs.collection('appointments').doc(ELEMENT_DATA[i].appointment_id).update({
//           isActive: false,
//         }).catch(function(error) {
//           console.error("Error removing document: ", error);
//         });
//       }
//   }
// }

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
}

//<div *ngIf="authService.userData as user"> <h1>Hello: {{(user.displayName) ? user.displayName : 'User'}}