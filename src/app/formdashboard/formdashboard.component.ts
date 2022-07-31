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
  // private url ='http://localhost:8000/api';
  medias: any[] = [];

  formValue !: FormGroup;
  // mediaModel = new MediaModel;

  mediaModel :  MediaModel = new MediaModel();
  // mediaData!: any;
  constructor(private formbuilder: FormBuilder,  private api: ApiService) {}


  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      title: [''],
      texte: [''],
      url_video: [''],
      image: ['']
    })
    // this.getAllMedia();
  }
  postMediaDetail(){
    this.mediaModel.title = this.formValue.value.title;
    this.mediaModel.texte = this.formValue.value.texte;
    this.mediaModel.url_video = this.formValue.value.url_video;
    this.mediaModel.image = this.formValue.value.image;
    console.log(this.mediaModel);
    this.api.postMedia(this.mediaModel)
    .subscribe(res=>{
      console.log(res);
      alert("Ajouter avec succès")

      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      // this.getAllMedia();

    }, err=>{
      alert("Une erreur s'est produite")
    })
  }

  // getAllMedia(){
  //   this.api.getMedia().subscribe(res=>{
  //     this.mediaData =res;
  //   })
  // }



}
