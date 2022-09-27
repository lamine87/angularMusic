import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Media } from '../models/media';
import { Youtube } from '../models/youtube';
import { DataService } from '../service/data.service';
import { Categories } from '../models/categories';
import { Pays } from '../models/pays';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  private url = 'http://127.0.0.1:8000/api';


  pages: number = 1;   // Pagination

  // public activities: any;
  public media : any[]= [];
  searchKey:string ="";
  // public totalItem : number = 0;
  public searchTerm !: string;
  pays!:Pays[];

  activities:any[] = [];
 // activities!:Youtube[];

 categories!:Categories[];
 selectedCategorie!: Categories;

  selectedHome!: Media;
  selectedYoutube!: Youtube;

  constructor(
    private http:HttpClient,
    private dataService: DataService,
    ) {}

  showHome(a :Media){
    this.selectedHome = a;
  }

  ngOnInit(): void {
    this.http.get(this.url+"/categorie").subscribe((res:any)=>{
      //console.log(res);
      this.categories = res.categorie;
    });
    this.http.get(this.url+"/pays").subscribe((res:any)=>{
      this.pays = res.pays;
    });

    this.http.get(this.url+"/media").subscribe((res:any)=>{
      //console.log(res);
      this.media = res;
      // this.totalItem = res.length;
    });

    this.http.get(this.url+"/youtube").subscribe((res:any)=>{
      //console.log(res);
      this.activities = res.activities;
    });

    this.dataService.search.subscribe((val:any)=>{
      this.searchKey = val;
    });

  }

  // Get media by User
  getUserMedia(id:any){
    this.dataService.filterMediaByUser(id).subscribe((res:any) =>{
      this.media = res;
      console.log(id)
      console.log(this.url+"/tag/"+id)
    })
  }

  // Filter media by categorie
  filterCategory(event:any){
    let value = event.target.value;
    console.log(value);
    this.getCatMedia(value)
  }

// Get media by categorie
  getCatMedia(id:any){
    this.dataService.getMediaByCategorie(id).subscribe((res:any) =>{
      this.media = res;
      console.log(id)
      console.log(this.url+"/categorie/media/"+id)

    })
  }

  filterContinent(event:any){
    let value = event.target.value;
    console.log(value);
    this.getMediaByContinent(value)
  }

  getMediaByContinent(id:any){
    this.dataService.mediaContinent(id).subscribe((res:any) =>{
      this.media = res;
      // console.log(id)
      // console.log(this.url+"/pays/media/"+id)

    })
  }


}







