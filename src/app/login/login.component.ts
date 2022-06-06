import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';

// import { Users } from '../models/users';

//import { AuthenticationService } from '../service/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class LoginComponent implements OnInit {
  private url = 'http://localhost:8000/api';

  login!:Login[];
  selectedDashboard!: Login;


  constructor(private http: HttpClient, private router: Router) { }

  showDashboard(d :Login){
    this.selectedDashboard = d;
  }
 
  ngOnInit(): void {

    // this.http.get(this.url+"/user").subscribe((res:any)=>{
    //   //console.log(res);
    //   this.users = res.users;
    // });

  }
  
  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;

    console.log(email, password, name);

    this.http.post(this.url+"/login", {
      email: email,
      password: password,
      name: name,
    }).subscribe((res:any) => {
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res));

      // Redirect to dashboard
      this.router.navigate(['/dashboard']);
    },
      err => {
        console.log(err);
      })

  }

}
