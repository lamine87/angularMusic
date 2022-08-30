import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { PaysComponent } from './pays/pays.component';
import { CategorieComponent } from './categorie/categorie.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormdashboardComponent } from './formdashboard/formdashboard.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';


//import { AuthenticationService } from './service/authentication.service';
//import { Ng2SearchPipeModule } from 'ng2-search-filter';
// const appRoutes: Routes = [
//   { path: '', component:HomeComponent}
// ]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CarouselComponent,
    ActualiteComponent,
    PaysComponent,
    CategorieComponent,
    SearchComponent,
    LoginComponent,
    DashboardComponent,
    FormdashboardComponent,

    //AuthenticationService
    //Ng2SearchPipeModule

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CommonModule,
    ToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

