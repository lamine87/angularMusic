import { Component, OnInit } from '@angular/core';
import { FormdashboardComponent } from '../formdashboard/formdashboard.component';
import { HttpClient } from '@angular/common/http';
import { Media } from '../models/media';
import { Users } from '../models/users';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categories } from '../models/categories';
import { Pays } from '../models/pays';
import { NgForm } from '@angular/forms';
import { DataService } from '../service/data.service';



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
    form!: FormGroup;


  // selectedDashboard!: Users;

  constructor(private http:HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    // private formdashboard: FormdashboardComponent,
    private dataService:DataService) {}

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
    this.getMedia();
    // this.openEdit(id:any);


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
  get f() {
    return this.form.controls;
  }

  getMedia(){
    this.http.get(this.url+"/media").subscribe((res:any)=>{
      //console.log(res);
      this.medias = res;
      // if(this.medias!=null){
      // }else{
      //   alert("Espace vide");
      // }
    });
  }

  deleteMedia(id :any) {
     this.dataService.deleteMedia(id).subscribe(
      (res:any) => {
      alert("Souhaitez-vous supprimer ?");
      this.getMedia();
    })
  }

  openEdit(data=null) {
    // this.form.controls['title'].setValue(media.title);
    // this.form.controls['texte'].setValue(media.texte);
    // this.form.controls['url_video'].setValue(media.url_video);
    // this.form.controls['pays'].setValue(media.pays);
    // this.form.controls['categories'].setValue(media.categories);
    // this.form.controls['image'].setValue(media.image);
    // this.showForm = true;
    // if(data){
    //   this.title = data.title;
    //   this.texte = data.texte;
    //   this.url_video = data.url_video;
    //   this.pays = data.pays;
    //   this.categories = data.categories;
    //   this.image = data.image;
    // }


  };



}
