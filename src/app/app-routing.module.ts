import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './modules/about/about.component';
import { AdminComponent } from './modules/admin/admin.component';
import { BlogDetailComponent } from './modules/blog-detail/blog-detail.component';
import { BlogComponent } from './modules/blog/blog.component';
import { BookDetailComponent } from './modules/book-detail/book-detail.component';
import { BookListComponent } from './modules/book-list/book-list.component';
import { CartComponent } from './modules/cart/cart.component';
import { CategoryComponent } from './modules/category/category.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { ConfirmComponent } from './modules/confirm/confirm.component';
import { ContactComponent } from './modules/contact/contact.component';
import { HomeComponent } from './modules/home/home.component';
import { LogInComponent } from './modules/log-in/log-in.component';
import { RegisterComponent } from './modules/register/register.component'

import { AuthGuard }from './_helpers/auth.guard'

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-detail', component: BlogDetailComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'order', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'order/:id', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'confirm', component: ConfirmComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LogInComponent},
  { path: 'sign-up', component: RegisterComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
