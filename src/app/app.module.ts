import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { PaysComponent } from './pays/pays.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { DataService } from './service/data.service';
import { FilterPipe } from './shared/filter.pipe';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { VidioyoutubeComponent } from './vidioyoutube/vidioyoutube.component';
import { DashboarduserComponent } from './dashboarduser/dashboarduser.component';
import { UpdatemediaComponent } from './updatemedia/updatemedia.component';
import { SecureComponent } from './secure/secure.component';

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
    LoginComponent,
    DashboardComponent,
    FilterPipe,
    LogoutComponent,
    VidioyoutubeComponent,
    DashboarduserComponent,
    UpdatemediaComponent,
    SecureComponent,


  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'logout',
        component: LogoutComponent,
        // canActivate: [AuthGuard]
      }
    ]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),

  ],
  providers: [DataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

