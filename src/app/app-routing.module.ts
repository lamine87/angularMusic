import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { PaysComponent } from './pays/pays.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { VidioyoutubeComponent } from './vidioyoutube/vidioyoutube.component';
import { DashboarduserComponent } from './dashboarduser/dashboarduser.component';
import { UpdatemediaComponent } from './updatemedia/updatemedia.component';
import { SecureComponent } from './secure/secure.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'actualite', component: ActualiteComponent },
  { path: 'pays', component: PaysComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addmedia', component: DashboardComponent },
  // { path: 'update/media/', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuard] },
  { path: 'videoyoutube', component: VidioyoutubeComponent },
  { path: "", redirectTo: "/home", pathMatch:"full" },
  {
    path: 'dashboard',
    component: DashboardComponent, canActivate:[AuthGuard]
  },
  { path: 'secure', component: SecureComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
