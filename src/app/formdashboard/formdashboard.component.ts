import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Media } from './media';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { Pays } from '../models/pays';
import { Categories } from '../models/categories';

@Component({
  selector: 'app-formdashboard',
  templateUrl: './formdashboard.component.html',
  styleUrls: ['./formdashboard.component.css'],
})
export class FormdashboardComponent implements OnInit {
  public url:string = 'http://localhost:8000/api';

  files: any;
  data: any;
  submitted = false;
  form!: FormGroup;
  media = new Media();

  categories!:Categories[];
  selectedCategorie!: Categories;

  pays!: Pays[];
  selectedPays!: Pays;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient
  ) {}




  createForm() {
    this.form = this.formBuilder.group({
      title: ['',Validators.required],
      texte: ['',Validators.required],
      url_video: ['',Validators.required],
      pays: ['',Validators.required],
      categories: ['',Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createForm();

    this.http.get(this.url+"/pays").subscribe((res:any)=>{
      this.pays = res.pays;
    });

    this.http.get(this.url+"/categorie").subscribe((res:any)=>{
      //console.log(res);
      this.categories = res.categorie;
    });
  }

  get f() {
    return this.form.controls;
  }

  uploadImage(event: any) {
    this.files = event.target.files[0];
    console.log(this.files);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append("image", this.files, this.files.name);
    formData.append('title', this.form.value.title);
    formData.append('texte', this.form.value.texte);
    formData.append('pays', this.form.value.pays);
    formData.append('categories', this.form.value.categories);
    formData.append('url_video', this.form.value.url_video);

    this.dataService.uploadData(formData).subscribe((res) => {
      this.data = res;
      // console.log(this.categories);
      // console.log(this.pays);

      console.log(this.data);

      if(this.data.status = true) {
        this.toastr.success(JSON.stringify(this.data.message), '', {
          timeOut: 2000,
          progressBar: true,
        });
        // this.form.reset();
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.error(JSON.stringify(this.data.message), '', {
          timeOut: 2000,
          progressBar: true,
        });
      }
      this.submitted = false;
      // this.form.get('image').reset();
    });
  }
}
