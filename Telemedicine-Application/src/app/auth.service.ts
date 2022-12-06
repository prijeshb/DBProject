import { Injectable, NgZone } from '@angular/core';
import { Patient } from "./patient";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data
  // snackBarRef: MatSnackBar;
  constructor(
    public snackBar: MatSnackBar,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password, userType) {
    console.log(userType)
    if(!userType){
      let snackBarRef = this.snackBar.open('Select user type', 'Dismiss', {duration: 4000});
      return;
    }
      
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {

        localStorage.setItem("userType",userType);
        if(userType == "Chemist"){
          this.ngZone.run(() => {
            this.router.navigate(['chemisthome']);
          });
        }
        if(userType == "Doctor"){
          this.ngZone.run(() => {
            this.router.navigate(['doctorhome']);
          });   
        }
        if(userType == "Patient"){
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });      
        }

        // this.SetUserData(result.user);
      }).catch((error) => {
        let snackBarRef = this.snackBar.open(error.message, 'Dismiss', {duration: 5000});
      })
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: Patient = {
      id: user.uid,
      email: user.email,
      displayName: null,
      firstName: null,
      lastName: null,
      age: null,
      address: null,
      phoneNumber: null,
      salary: null,
      isDoctor: false,
      userType : "0"
      
    }
    // return userRef.set(userData, {
    //   merge: true
    // })
  }

  // Sign up with email/password
  SignUp(email, password, userType) {
    const hasNumbers = /\d/.test(password)
    if(password.length < 8 || !hasNumbers)
    {
      let snackBarRef = this.snackBar.open('Password must include at least 8 characters and a number!', 'Dismiss', {duration: 6000});
    }
    
    if(!userType){
      let snackBarRef = this.snackBar.open('Select user type', 'Dismiss', {duration: 4000});
      return;
    }
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        localStorage.setItem("userType", userType)
        this.SetUserData(result.user);
        let snackBarRef = this.snackBar.open('Successfully registered, please login!', '', {duration: 3000});
      }).catch((error) => {
        let snackBarRef = this.snackBar.open(error.message, 'Dismiss', {duration: 5000});
      })
    
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        let snackBarRef = this.snackBar.open('Password reset email sent, check your inbox.', '', {duration: 3000});
      }).catch((error) => {
        let snackBarRef = this.snackBar.open(error.message, 'Dismiss', {duration: 5000});
      })
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('result.user');
      localStorage.removeItem('patient_id')
      localStorage.removeItem('userType')
      this.router.navigate(['login']);
    })
  }
}

