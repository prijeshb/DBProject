import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userTypeList: any[] = ['Patient', 'Doctor', 'Chemist'];
  
  constructor(public authService: AuthService) { }

  ngOnInit() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }
  onChangeSignup(event:any){
    console.log(event)
    localStorage.setItem("userType", event.value)
  }
  onChange(event:any){
    localStorage.setItem("userType", event.value)
  }

}
