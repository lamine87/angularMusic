import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pays } from '../models/pays'
import { Categories } from '../models/categories'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private url = 'http://127.0.0.1:8000/api/pays';
  pays!:Pays[];
  selectedPays!: Pays;

  private _url = 'http://127.0.0.1:8000/api/categorie';
 categories!:Categories[];
  selectedCategorie!: Categories;

  constructor(private http:HttpClient) {}

  showPays(p :Pays){
    this.selectedPays = p;
  }
  showCategorie(cat :Categories){
    this.selectedCategorie = cat;
  }

  ngOnInit(): void {
    this.http.get(this.url).subscribe((res:any)=>{

      this.pays = res.pays;

    });
    this.http.get(this._url).subscribe((res:any)=>{
      console.log(res);
      this.categories = res.categorie;

    });
  }

}
