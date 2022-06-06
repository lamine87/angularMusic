import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pays } from '../models/pays';
import { Categories } from '../models/categories';
import { DataService } from '../service/data.service';
import { Media } from '../models/media';
// import { SearchComponent } from '../search/search.component'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})

export class HeaderComponent implements OnInit {
  data: any;
  private url = 'http://127.0.0.1:8000/api';
  pays!:Pays[];
  selectedPays!: Pays;
  // datas!:Media[];

  categories!:Categories[];
  selectedCategorie!: Categories;

  loggedIn:boolean = false;
  constructor(private http:HttpClient, private dataService:DataService) {}


  showPays(p :Pays){
    this.selectedPays = p;
  }
  showCategorie(cat :Categories){
    this.selectedCategorie = cat;
  }



  ngOnInit(): void {
    this.http.get(this.url+"/pays").subscribe((res:any)=>{

      this.pays = res.pays;
    });
 

    this.http.get(this.url+"/categorie").subscribe((res:any)=>{
      //console.log(res);
      this.categories = res.categorie;

    });


    
  }
 
  getMediaSearch(title: any){
    const keyword = title.target.value;
    // console.log(keyword)
    const search = this.dataService.getSearchTitle(keyword).then(response =>
      {
        this.data = response;
        console.log(this.data);
      })
  }

}
