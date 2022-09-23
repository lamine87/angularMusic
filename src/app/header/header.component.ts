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
  private url = 'http://127.0.0.1:8000/api';
  data: any;
  pays!:Pays[];
  selectedPays!: Pays;
  // datas!:Media[];

  public media : any[] = []; //
  // public filterCategory : any
  public totalItem : number = 0;
  public searchTerm !: string;

  categories!:Categories[];
  selectedCategorie!: Categories;

  loggedIn:boolean = false;


  constructor(
    private http:HttpClient,
    private dataService: DataService
    ) {}


  showPays(p :Pays){
    this.selectedPays = p;
  }
  showCategorie(cat :Categories){
    this.selectedCategorie = cat;
  }

  filterCategory(event:any){
    let value = event.target.value;
    console.log(value);
    this.getCatMedia(value)
  }

  getCatMedia(id:any){
    this.dataService.getMediaByCategorie(id).subscribe((res:any) =>{
      this.media = res.media;
      console.log(id)
    })
  }



  ngOnInit(): void {

   }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.dataService.search.next(this.searchTerm);
  }


}
