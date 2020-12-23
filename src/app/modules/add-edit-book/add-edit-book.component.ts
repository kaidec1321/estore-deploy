import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/_services/global.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {
  category: string = null;
  fileToUpload: File = null;
  mode: string = 'Add';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<AddEditBookComponent>) { }
  uploadForm: FormGroup;

  get f() { return this.uploadForm.controls; }

  ngOnInit(): void {
    if (this.data.item.id) this.mode = 'Edit';
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.uploadForm = this.formBuilder.group({
      title: [this.data.item.title, Validators.required],
      author: [this.data.item.author, Validators.required],
      isbn: [this.data.item.isbn],
      noPage: [this.data.item.noPage, Validators.required],
      size: [this.data.item.size],
      price: [this.data.item.pricePerUnit, Validators.required],
      discount: [this.data.item.discount],
      publisher: [this.data.item.publisher],
      publicationDate: [formatDate(this.data.item.publicationDate, 'yyyy-MM-dd', 'en')],
      description: [this.data.item.description],
      bookImages: ['']
    });
  }

  handleFileInput(files) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {
    if (this.uploadForm.invalid) {
      alert("Please check your input!");
      return
    }
    if (this.mode == 'Add') {
      let formData = new FormData();
      if (this.mode == 'Add') formData.append('image', this.fileToUpload);
      formData.append('title', this.f.title.value);
      formData.append('author', this.f.author.value);
      formData.append('noPage', this.f.noPage.value);
      formData.append('size', this.f.size.value);
      formData.append('pricePerUnit', this.f.price.value);
      formData.append('discount', this.f.discount.value);
      formData.append('categoryId', this.data.item.categoryId);
      formData.append('categoryName', this.data.categories.find(item => item.id == this.data.item.categoryId).name);
      formData.append('publisher', this.f.publisher.value);
      formData.append('publicationDate', this.f.publicationDate.value);
      formData.append('description', this.f.description.value);
      formData.append('isbn', this.f.isbn.value);
      this.globalService.addBook(formData).subscribe(data => {
        this.dialogRef.close(data);
      }, error => {
        alert("Created failed! Try again.");
      });
    }
    else {
      this.data.item.title = this.f.title.value;
      this.data.item.author = this.f.author.value;
      this.data.item.noPage = this.f.noPage.value;
      this.data.item.size = this.f.size.value;
      this.data.item.pricePerUnit = this.f.price.value;
      this.data.item.discount = this.f.discount.value;
      this.data.item.categoryName = this.data.categories.find(item => item.id == this.data.item.categoryId).name;
      this.data.item.publisher = this.f.publisher.value;
      this.data.item.publicationDate = this.f.publicationDate.value;
      this.data.item.description = this.f.description.value;
      this.data.item.isbn = this.f.isbn.value;
      this.globalService.editBook(this.data.item.id, this.data.item.title, this.data.item.author,
        this.data.item.noPage, this.data.item.size, this.data.item.pricePerUnit,
        this.data.item.discount, this.data.item.categoryId, this.data.item.categoryName,
        this.data.item.publisher, this.data.item.publicationDate,
        this.data.item.description, this.data.item.isbn).subscribe(data => {
          this.dialogRef.close(this.data.item);
    }, error => {
      alert("Update fail! Try again.")});
    }
  }

}
