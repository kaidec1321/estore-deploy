import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/_models/book';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Book,
  private formBuilder: FormBuilder) {}
  uploadForm: FormGroup;

  get f() { return this.uploadForm.controls; }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.uploadForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.f.name.value);
  }

}
