import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie.component';
import { HomeComponent } from './home/home.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { PanierComponent } from './panier/panier.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailCmdComponent } from './profile/detail-cmd/detail-cmd.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'', component: LayoutsComponent,
  children:[
    {path: 'home', component: HomeComponent},
    {path: 'categorie/:id', component: CategorieComponent},
    {path: 'produit/:id', component: DetailProduitComponent},
    {path: 'panier', component: PanierComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'detail-cmd', component: DetailCmdComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
