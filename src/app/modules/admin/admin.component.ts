import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/_models/book';
import { AddEditBookComponent } from '../add-edit-book/add-edit-book.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentState: number = 0;
  title: string[] = ['Books List', 'Orders List', 'Users List'];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  changeState(state) {
    this.currentState = state;
  }
  addNew() {
    this.dialog.open(AddEditBookComponent, {
      data: {},
    });
  }

}
