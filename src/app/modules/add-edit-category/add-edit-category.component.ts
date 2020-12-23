import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<AddEditCategoryComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.data.item.id) {
      this.globalService.addCategory(this.data.item.name, this.data.item.description).subscribe(data => {
        this.dialogRef.close(data);
      }, error => {
        alert('Create failed! Try again!');
      })
    } else {
      this.globalService.editCategory(this.data.item.id, this.data.item.name, this.data.item.description).subscribe(data => {
        this.dialogRef.close(this.data.item);
      }, error => {
        alert('Update failed! Try again!');
      })
    }
  }

}
