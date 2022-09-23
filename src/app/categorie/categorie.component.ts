import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Media } from '../models/media';
import { Users } from '../models/users';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Categories } from '../models/categories';
import { Pays } from '../models/pays';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  private url = 'http://localhost:8000/api';

  public media : any ;
  public totalItem : number = 0;
  public searchTerm !: string;
  pages: number = 1;   // Pagination
  // media!:Media[];
  selectedMedia!: Media;
  // mediaObj = new Media();
  categories!:Categories[];
  selectedCategorie!: Categories;
  selectedHome!: Media;
  searchKey:string ="";
  catId:any;

  constructor(
    private http:HttpClient,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute,

  ) { }

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


  showHome(a :Media){
    this.selectedHome = a;
  }

  ngOnInit(): void {

    // Try by category id
    // this.route.paramMap.subscribe(params=>{
    //   this.catId = params.get('id');
    //   console.log(this.catId)
    // });
    // this.getCategorieMedia(this.catId);
    // this.dataService.search.subscribe((val:any)=>{
    //   this.searchKey = val;
    // })
  }


  // getCategorieMedia(id:any){
  //      // Get media for categories
  //      this.dataService.listCategorie(id).subscribe((res:any)=>{
  //       //console.log(res);
  //       this.media = res;
  //     })

  // }

}
