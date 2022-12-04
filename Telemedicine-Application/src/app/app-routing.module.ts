import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MyfilesComponent } from './myfiles/myfiles.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { VideocallComponent } from './videocall/videocall.component';
import { MedicineComponent } from './medicine/medicine.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { DoctorReportComponent } from './doctor-report/doctor-report.component';
import { ChemistHomeComponent } from './chemist-home/chemist-home.component';
// import { }




const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'myaccount', component: MyaccountComponent },
  { path: 'myfiles', component: MyfilesComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'chatbox', component: ChatboxComponent },
  { path: 'videocall', component: VideocallComponent },
  { path: 'medicine', component: MedicineComponent},
  { path: 'doctorhome', component: DoctorHomeComponent},
  { path: 'chemisthome', component: ChemistHomeComponent},
  // { path: 'medicine', component: MedicineComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
