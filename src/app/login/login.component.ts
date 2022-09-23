import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute  } from '@angular/router';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject } from 'rxjs';
import { Users } from '../models/users';
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

  id!: number;
  files: any;
  data: any;
  submitted = false;
  formRegister!: FormGroup;
  login!:Login[];
  selectedDashboard!: Login;
  // email='';
  // password='';
  wrongCredentials= false;
  withCredentials= false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    ) { }

  showDashboard(d :Login){
    this.selectedDashboard = d;
  }

  ngOnInit(): void {
      this.createForm();
  }


 //  authentication user
    loginUser(event: any){
      // event.preventDefault();
      const target = event.target
      const email = target.querySelector('#email').value
      const password = target.querySelector('#password').value
      this.dataService.getUserDetails(email, password).subscribe((data:any) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        // if (data.success) {
          this.router.navigate(['/dashboard']);
          // this.dataService.setLoggedIn(true);
        // }else{
          // window.alert(data.message)
          // this.router.navigate(['/login']);
        // }
      })
      console.log(email, password)
    }

    createForm() {
      this.formRegister = this.formBuilder.group({
        name: [''],
        email: [''],
        password: [''],
        password_confirmation: [''],
        lien_facebook: [''],
        lien_instagram: [''],
        avatar: [''],
      });
    }
    uploadImage(event: any) {
      this.files = event.target.files[0];
      console.log(this.files);
    }
    get f() {
      return this.formRegister.controls;
    }
    onSubmitRegister() {
      this.submitted = true;
      if (this.formRegister.invalid) {
        return;
      }
      const formData = new FormData();
      formData.append('name', this.formRegister.value.name);
      formData.append('email', this.formRegister.value.email);
      formData.append('password', this.formRegister.value.password);
      formData.append('password_confirmation', this.formRegister.value.password_confirmation);
      formData.append('lien_facebook', this.formRegister.value.lien_facebook);
      formData.append('lien_instagram', this.formRegister.value.lien_instagram);
      formData.append("avatar", this.files);

      this.dataService.postRegister(formData).subscribe((res) => {
        this.data = res;
        console.log(this.data);
        if(this.data.status = true) {
          this.toastr.success(JSON.stringify(this.data.message), '', {
            timeOut: 2000,
            progressBar: true,
          });

          // alert("Envoyer avec succes")
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formRegister.reset();
          this.router.navigate(['/show/user']);
        } else {
          this.toastr.error(JSON.stringify(this.data.message), '', {
            timeOut: 2000,
            progressBar: true,
          });
        }
        this.submitted = false;
        // this.getMedia();
      });

    }

}
