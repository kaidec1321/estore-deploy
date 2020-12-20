import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/_models/book';

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

}



@Component({
  selector: 'dialog-add-book-dialog',
  templateUrl: 'dialog-add-book-dialog.html',
})
export class DialogAddBookDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Book) {}
}
