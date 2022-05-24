import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actualites } from '../models/actualites'

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit {

  private url = 'http://127.0.0.1:8000/api/actualite';
  actualites!:Actualites[];
  selectedActualite!: Actualites;

  constructor(private http:HttpClient) {}

  showActualite(a :Actualites){
    this.selectedActualite = a;
  }


  ngOnInit(): void {
    this.http.get(this.url).subscribe((res:any)=>{
     // console.log(res);

      this.actualites = res.actualites;

    });
  }

}
