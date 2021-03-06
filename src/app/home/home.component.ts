import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Media } from '../models/media';
import { Youtube } from '../models/youtube';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  private url = 'http://127.0.0.1:8000/api';

  pages: number = 1;
  medias: any[] = [];
  // medias!:Media[];


  activities:any[] = [];
 // activities!:Youtube[];

  selectedHome!: Media;
  selectedYoutube!: Youtube;

  constructor(private http:HttpClient) {}

  showHome(a :Media){
    this.selectedHome = a;
  }

  ngOnInit(): void {
    this.http.get(this.url+"/media").subscribe((res:any)=>{
      //console.log(res);
      this.medias = res;

    });

    this.http.get(this.url+"/youtube").subscribe((res:any)=>{
      //console.log(res);
      this.activities = res.activities;

    });

  }

}







