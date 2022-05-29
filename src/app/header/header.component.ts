import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pays } from '../models/pays';
import { Categories } from '../models/categories';
//import {MatDialog} from '@angular/material/dialog';
//import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})

export class HeaderComponent implements OnInit {

  private url = 'http://127.0.0.1:8000/api';
  pays!:Pays[];
  selectedPays!: Pays;


  categories!:Categories[];
  selectedCategorie!: Categories;


  constructor(private http:HttpClient) {}


  showPays(p :Pays){
    this.selectedPays = p;
  }
  showCategorie(cat :Categories){
    this.selectedCategorie = cat;
  }

  search(): void {
    this.http.get(this.url+"/media/search/").subscribe((res:any)=>{
      console.log(res);
      this.categories = res.categorie;
  });
  }
  ngOnInit(): void {
    this.http.get(this.url+"/pays").subscribe((res:any)=>{

      this.pays = res.pays;
    });

    this.http.get(this.url+"/categorie").subscribe((res:any)=>{
      console.log(res);
      this.categories = res.categorie;

    });
  }

}
