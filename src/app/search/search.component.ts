import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Media } from '../models/media'
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
data: any;
private url = 'http://127.0.0.1:8000/api';

medias!:Media[];
selectedSearch!: Media;

constructor(private http:HttpClient, private dataService:DataService) {}

  showSearch(sear :Media){
    this.selectedSearch = sear;
  }


  ngOnInit(): void {
    this.http.get(this.url).subscribe((res:any)=>{

      this.medias = res.medias;

    });
  }

  // getMediaSearch(title: any){
  //   const keyword = title.target.value;
  //   // console.log(keyword)
  //   const search = this.dataService.getSearchTitle(keyword).then(response =>
  //     {
  //       this.data = response;
  //       console.log(this.data);
  //     })
  // }

}
