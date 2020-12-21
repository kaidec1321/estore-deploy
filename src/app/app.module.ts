import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { fakeBackendProvider } from '../app/_helpers/fake-backend';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { CartComponent } from './modules/cart/cart.component';
import { CategoryComponent } from './modules/category/category.component';
import { BookListComponent } from './modules/book-list/book-list.component';
import { BookDetailComponent } from './modules/book-detail/book-detail.component';
import { AboutComponent } from './modules/about/about.component';
import { ConfirmComponent } from './modules/confirm/confirm.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { ContactComponent } from './modules/contact/contact.component';
import { BlogComponent } from './modules/blog/blog.component';
import { BlogDetailComponent } from './modules/blog-detail/blog-detail.component';
import { LogInComponent } from './modules/log-in/log-in.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { AdminComponent } from './modules/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from './_services/global.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './modules/register/register.component';
import { AddEditBookComponent } from './modules/add-edit-book/add-edit-book.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    CategoryComponent,
    BookListComponent,
    BookDetailComponent,
    AboutComponent,
    ConfirmComponent,
    CheckoutComponent,
    ContactComponent,
    BlogComponent,
    BlogDetailComponent,
    LogInComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    RegisterComponent,
    AddEditBookComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
