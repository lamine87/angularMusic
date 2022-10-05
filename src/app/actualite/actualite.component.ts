import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actualites } from '../models/actualites'
// import { Youtube } from '../models/youtube';
// import { DataService } from '../service/data.service';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit {

  private url = 'http://127.0.0.1:8000/api';
  pages: number = 1;   // Pagination
  public actualite : any[]= [];
  searchKey:string ="";
  // public totalItem : number = 0;
  public searchTerm !: string;


  actualites!:Actualites[];
  selectedActualite!: Actualites;

  constructor(
    private http:HttpClient,
    private apiService: ApiService,
    ) {}

  showActualite(a :Actualites){
    this.selectedActualite = a;
  }


  ngOnInit(): void {
    this.http.get(this.url+"/actualite").subscribe((res:any)=>{
     console.log(res);
      this.actualites = res;
    });
    this.apiService.search.subscribe((val:any)=>{
      this.searchKey = val;
    });

  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.apiService.search.next(this.searchTerm);
  }

}
