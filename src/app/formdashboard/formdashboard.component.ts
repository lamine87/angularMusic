import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Media } from '../models/media';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { DataService } from '../service/data.service';
import { ApiService } from '../service/api.service';
import { MediaModel } from './dashboardMediaModel';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-formdashboard',
  templateUrl: './formdashboard.component.html',
  styleUrls: ['./formdashboard.component.css']
})
export class FormdashboardComponent implements OnInit {
  // data: any;
  private url ='http://localhost:8000/api';
  medias: any[] = [];
  // selectedMedia!: Media;
  formValue !: FormGroup;
  mediaModelObj :  MediaModel = new MediaModel();

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private api: ApiService) {}


  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      title: [''],
      texte: [''],
      url_video: [''],
      image: ['']
    })
  }
  postMediaDetail(){
    this.mediaModelObj.title = this.formValue.value.title;
    this.mediaModelObj.texte = this.formValue.value.texte;
    this.mediaModelObj.url_video = this.formValue.value.url_video;
    this.mediaModelObj.image = this.formValue.value.image;

    this.api.postMedia(this.mediaModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Ajouter avec succès")
      this.formValue.reset();
    }, err=>{
      alert("Une erreur s'est produite")
    })
  }


}
