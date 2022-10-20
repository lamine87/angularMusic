import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
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
  selector: 'app-dashboarduser',
  templateUrl: './dashboarduser.component.html',
  styleUrls: ['./dashboarduser.component.css']
})
export class DashboarduserComponent implements OnInit {
  private url = 'http://localhost:8000/api';
  id!: number;
  files: any;
  data: any;
  submitted = false;
  form!: FormGroup;
  showForm= false;
  showPostMedia!: boolean;
  showUpdateMedia!: boolean;
  showImage!: boolean;
  requiredImage!: boolean;

  media!:Media[];
  selectedMedia!: Media;
  mediaObj = new Media();

  categories!:Categories[];
  selectedCategorie!: Categories;

  pays!:Pays[];
  selectedPays!: Pays;

  // users!: Users[];
  email: string ='';
  password: string ='';

  constructor(
    private http:HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }
  showDashboard(m :Media){
    this.selectedMedia = m;
  }

  ngOnInit(): void {
    this.getMedia();
    this.createForm();
  }

    // Afficher media
    getMedia(){

      this.http.get(this.url+'/show/user').subscribe((res:any)=>{
        console.log(res);
        this.media = res;
        // if (data) {
        //   this.dataService.setLoggedIn(true);
        // }
      });
    }

  get f() {
    return this.form.controls;
  }

   // Delete media
   deleteMedia(id :any) {
    this.dataService.delete(id).subscribe(
      (res:any) => {
      alert("Souhaitez-vous supprimer ?");
      this.getMedia();
    })
   }
    // Get form media
    createForm() {
      this.form = this.formBuilder.group({
        // title: ['',Validators.required],
        title: [''],
        texte: [''],
        url_video: [''],
        pays: [''],
        categories: [''],
        image: [''],
      });
    }

     // Chargement d'image
     uploadImage(event: any) {
      this.files = event.target.files[0];
      console.log(this.files);
    }

    onSubmit() {
      this.submitted = true;
      // this.requiredImage = true;
      if (this.form.invalid) {
        return;
      }
      // Envoie de media
      const formData = new FormData();
      formData.append('title', this.form.value.title);
      formData.append('texte', this.form.value.texte);
      formData.append('pays', this.form.value.pays);
      formData.append('categories', this.form.value.categories);
      formData.append('url_video', this.form.value.url_video);
      formData.append("image", this.files, this.files.name);
      this.dataService.postDataMedia(formData).subscribe((res) => {
        this.data = res;
        console.log(this.data);
        if(this.data.status = true) {
          this.toastr.success(JSON.stringify(this.data.message), '', {
            timeOut: 2000,
            progressBar: true,
          });

          // alert("Envoyer avec succes")
          let ref = document.getElementById('cancel');
          ref?.click();
          this.form.reset();

        } else {
          this.toastr.error(JSON.stringify(this.data.message), '', {
            timeOut: 2000,
            progressBar: true,
          });
        }
        this.submitted = false;
        this.getMedia();
      });

    }
    clickPostOrUpdate(){
      this.form.reset();
      this.showPostMedia = true;
      this.showUpdateMedia = false;
      this.showImage= false;
      this.requiredImage = true;
    }

        // Get formulaire edit media
    editMedia(media:any,) {
        this.showPostMedia = false;
        this.showUpdateMedia = true;
        this.showImage = true;
        this.requiredImage = false;

        this.mediaObj.id = media.id
        this.form.controls['title'].setValue(media.title);
        this.form.controls['texte'].setValue(media.texte);
        this.form.controls['url_video'].setValue(media.url_video);
        this.form.controls['pays'].setValue(media.pays);
        this.form.controls['categories'].setValue(media.categories);
        this.form.controls['image'].setValue(media.files);
      };

    // Envoie après modification de media
    postEditMedia() {
      this.submitted = true;

      if (this.form.invalid) {
        return;
      }

      const formData = new FormData();
      // let formData: any = {};
      formData.append('title', this.form.value.title);
      formData.append('texte', this.form.value.texte);
      formData.append('pays', this.form.value.pays);
      formData.append('categories', this.form.value.categories);
      formData.append('url_video', this.form.value.url_video);
      formData.append("image", this.files, this.files.name);
      this.dataService.updateMedia(formData,this.mediaObj.id).subscribe((res) => {
        console.log(this.mediaObj);
        console.log(this.mediaObj.id);
        // this.data = res;
        // console.log(this.categories);
        // console.log(this.pays);
        if(this.data.status = true) {
          this.toastr.success(JSON.stringify(this.data.message), '', {
            timeOut: 2000,
            progressBar: true,
          });

          // alert("Envoyer avec succes")
          let ref = document.getElementById('cancel');
          ref?.click();
          this.form.reset();

        } else {
          this.toastr.error(JSON.stringify(this.data.message), '', {
            timeOut: 2000,
            progressBar: true,
          });
        }
        this.submitted = false;
        this.getMedia();
      });
      }


}
