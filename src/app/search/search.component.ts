import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Media } from '../models/media'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

private url = 'http://127.0.0.1:8000/api/media/search/';

medias!:Media[];
selectedSearch!: Media;

constructor(private http:HttpClient) {}

  showSearch(sear :Media){
    this.selectedSearch = sear;
  }

  ngOnInit(): void {
    this.http.get(this.url).subscribe((res:any)=>{

      this.medias = res.medias;

    });

  }
}
