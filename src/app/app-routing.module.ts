import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { PaysComponent } from './pays/pays.component';
import { CategorieComponent } from './categorie/categorie.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'actualite', component: ActualiteComponent },
  { path: 'pays', component: PaysComponent },
  { path: 'categorie', component: CategorieComponent },
  { path: "", redirectTo: "/home", pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
