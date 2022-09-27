import { Component, OnInit, forwardRef } from '@angular/core';
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
import { Spectacles } from '../models/spectacles';
import { Actualites } from '../models/actualites';
// import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private url = 'http://localhost:8000/api';


    id!: number;
    files: any;
    data: any;
    submitted = false;
    form!: FormGroup;
    formActu!: FormGroup;
    showForm = false;
    showPostMedia!: boolean;
    showUpdateMedia!: boolean;

    showPostActu!: boolean;
    showUpdateActu!: boolean;
    showImage!: boolean;
    requiredImage!: boolean;
    showActuImage!: boolean;
    requiredActuImage!: boolean;

    media!:Media[];
    selectedMedia!: Media;
    mediaObj = new Media();

    actualites!:Actualites[];
    selectedActu!: Actualites;
    actuObj = new Actualites();

    categories!:Categories[];
    selectedCategorie!: Categories;

    spectacles!: Spectacles[];
    pays!:Pays[];
    selectedPays!: Pays;

    users!: Users[];


  // selectedDashboard!: Users;
  constructor(
    private http:HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private formActuBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private route: ActivatedRoute,

    ) {}

    logoutUser() {
      this.dataService.logout();
      this.router.navigate(['login']);
    }

   // user logout

  //  logout() {
      // return new Observable<boolean>((observer)=>{
      //   this.http.get(this.url+'/logout').subscribe(result=>{
      //     observer.next(true);
      //     observer.complete();
      // },error=>{
      //   observer.error(false);
      //   observer.complete();
      // });
      // })
      // alert('Confirmer deconnexion');
      // localStorage.removeItem('loggedIn');
      // this.router.navigate(['/home']);
    //  }

    showCategorie(cat :Categories){
      this.selectedCategorie = cat;
    }

    showPays(p :Pays){
      this.selectedPays = p;
    }

    showDashboard(m :Media){
      this.selectedMedia = m;
    }

    showDashboardActu(m :Actualites){
      this.selectedActu = m;
    }

    ngOnInit(): void {
      this.getMedia();
      this.createForm();
      this.createFormActu();
      // this.editForm();

      this.http.get(this.url+"/categorie").subscribe((res:any)=>{
        //console.log(res);
        this.categories = res.categorie;
      });

      this.http.get(this.url+"/pays").subscribe((res:any)=>{
        this.pays = res.pays;
      });
      this.http.get(this.url+"/spectacles").subscribe((res:any)=>{
        //console.log(res);
        this.spectacles = res;
      });

    }
    // get erreur media form
    get f() {
      return this.form.controls;
    }

    // Afficher media
    getMedia(){
      this.http.get(this.url+"/media/by/user").subscribe((res:any)=>{
        //console.log(res);
        this.media = res;
      });
    }

    // Delete media
    deleteMedia(id :any) {
      confirm("Souhaitez-vous supprimer ?");
      this.dataService.deleteMedia(id).subscribe(
        (res:any) => {
        // confirm("Souhaitez-vous supprimer ?");
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
// send form media
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
      formData.append('pays_id', this.form.value.pays);
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

      // get erreur actualite form
      get fa() {
        return this.formActu.controls;
      }

     // Get form media
    createFormActu() {
      this.formActu = this.formActuBuilder.group({
        title: [''],
        texte: [''],
        url_video: [''],
        spectacles: [''],
        image: [''],
      });
    }

    // Chargement d'image actualite
    uploadImageActu(event: any) {
      this.files = event.target.files[0];
      console.log(this.files);
    }
    // send form actualite
     actuOnSubmit() {
      this.submitted = true;
      // this.requiredActuImage = true;
      if (this.formActu.invalid) {
        return;
      }
      // Envoie de media
      const formDataActu = new FormData();
      formDataActu.append('title', this.formActu.value.title);
      formDataActu.append('texte', this.formActu.value.texte);
      formDataActu.append('spectacles', this.formActu.value.spectacles);
      formDataActu.append('url_video', this.formActu.value.url_video);
      formDataActu.append("image", this.files, this.files.name);

      this.dataService.postActualite(formDataActu).subscribe((res) => {
        this.data = res;
        console.log(this.data);
        console.log(res);
        if(this.data.status == true) {
          this.toastr.success(JSON.stringify(this.data.message), '', {
            timeOut: 2000,
            progressBar: true,
          });

          // alert("Envoyer avec succes")
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formActu.reset();

        } else {
          this.toastr.error(JSON.stringify(this.data.message), '', {
            timeOut: 2000,
            progressBar: true,
          });
        }
        this.submitted = false;
        // this.getMedia();
      });

    }
  // Button Edit or Add
    clickPostOrUpdateActu(){
      this.formActu.reset();
      this.showPostActu = true;
      this.showUpdateActu = false;
      this.showActuImage = false;
      this.requiredActuImage = true;
    }
    // Get formulaire edit media
    editActu(data:any,) {
      this.showPostActu = false;
      this.showUpdateActu = true;
      this.showActuImage = true;
      this.requiredActuImage = false;

      this.actuObj.id = data.id
      this.formActu.controls['title'].setValue(data.title);
      this.formActu.controls['texte'].setValue(data.texte);
      this.formActu.controls['url_video'].setValue(data.url_video);
      this.formActu.controls['spectacles'].setValue(data.spectacles);
      this.formActu.controls['image'].setValue(data.files);

    };

          // Envoie après modification de media
    postEditActu() {
      this.submitted = true;

      if (this.formActu.invalid) {
        return;
      }
      const formDataActu = new FormData();
      // let formData: any = {};
      formDataActu.append('title', this.form.value.title);
      formDataActu.append('texte', this.form.value.texte);
      formDataActu.append('spectacles', this.form.value.spectacles);
      formDataActu.append('url_video', this.form.value.url_video);
      formDataActu.append("image", this.files, this.files.name);

      this.dataService.updateActu(formDataActu,this.actuObj.id).subscribe((res) => {
        console.log(this.actuObj);
        console.log(this.actuObj.id);
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
        // this.getMedia();
      });
      }


  }


