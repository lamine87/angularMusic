import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Media } from '../models/media';
import { Users } from '../models/users';
// import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private url = 'http://127.0.0.1:8000/api';
  medias!:Media[];
  user!:Users;

  selectedHome!: Media;
  // selectedDashboard!: Users;

  constructor(private http:HttpClient) {}


  ngOnInit(): void {
    this.http.get(this.url+"/media").subscribe((res:any)=>{
      //console.log(res);
      this.medias = res;
    });

    this.http.get(this.url+"/user").subscribe((res:any)=>{
      //console.log(res);
      this.user = res;
    });
  }

}
