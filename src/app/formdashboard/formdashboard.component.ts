import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Media } from './media'
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formdashboard',
  templateUrl: './formdashboard.component.html',
  styleUrls: ['./formdashboard.component.css']
})
export class FormdashboardComponent implements OnInit {
  files: any;
  data: any;
  submitted= false;
  form!: UntypedFormGroup;
  media = new Media();

  constructor(private dataService: DataService, private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService, private router: Router) {}



    createForm() {
      this.form = this.formBuilder.group({
        title: [''],
        texte: [''],
        url_video: [''],
        image: [null, Validators.required]
      })
    }
    ngOnInit(): void {
      this.createForm();
    }

    get f(){
      return this.form.controls
    }
    uploadImage(event: any){
      this.files = event.target.files[0];
      console.log(this.files)
    }
    onSubmit(){
      this.submitted = true;

      if(this.form.invalid){
        return;
      }

      const formData = new FormData();
      formData.append("image",this.files, this.files.name);
      formData.append("title", this.form.value.title);
      formData.append("texte", this.form.value.texte);
      formData.append("url_video", this.form.value.url_video);

      this.dataService.uploadData(formData).subscribe(res=>{
        this.data = res;
          console.log(this.data);
          if(this.data.status = true){
            this.toastr.success(JSON.stringify(this.data.message),'',{
              timeOut: 2000,
              progressBar:true
            })
            this.router.navigate(['/dashboard']);
          }else{
            this.toastr.error(JSON.stringify(this.data.message),'',{
              timeOut: 2000,
              progressBar:true
            })
          }
            this.submitted = false;
            // this.form.get('image').reset();
      });
    }
  }



