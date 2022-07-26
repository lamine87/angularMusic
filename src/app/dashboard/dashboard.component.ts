import { Component, OnInit } from '@angular/core';
import { FormdashboardComponent } from '../formdashboard/formdashboard.component';
import { HttpClient } from '@angular/common/http';
import { Media } from '../models/media';
import { Users } from '../models/users';
import { Router } from '@angular/router';
// import { LoginComponent } from '../login/login.component';
import { Categories } from '../models/categories';
import { Pays } from '../models/pays';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private url = 'http://localhost:8000/api';


    medias!:Media[];
    selectedMedia!: Media;

    categories!:Categories[];
    selectedCategorie!: Categories;

    pays!:Pays[];
    selectedPays!: Pays;

    users!:Users[];


  // selectedDashboard!: Users;

  constructor(private http:HttpClient, private router: Router) {}

    showCategorie(cat :Categories){
      this.selectedCategorie = cat;
    }
    showPays(p :Pays){
      this.selectedPays = p;
    }
    showDashboard(m :Media){
      this.selectedMedia = m;
    }


  ngOnInit(): void {
    this.http.get(this.url+"/media").subscribe((res:any)=>{
      //console.log(res);
      this.medias = res;
    });

    this.http.get(this.url+"/user").subscribe((res:any)=>{
      //console.log(res);
      this.users = res.users;
    });
    this.http.get(this.url+"/categorie").subscribe((res:any)=>{
      //console.log(res);
      this.categories = res.categorie;
    });

    this.http.get(this.url+"/pays").subscribe((res:any)=>{

      this.pays = res.pays;
    });

  }




}
