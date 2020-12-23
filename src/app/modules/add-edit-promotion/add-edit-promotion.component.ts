import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Promotion } from 'src/app/_models/promotion';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-add-edit-promotion',
  templateUrl: './add-edit-promotion.component.html',
  styleUrls: ['./add-edit-promotion.component.css']
})
export class AddEditPromotionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Promotion,
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<AddEditPromotionComponent>) { }

  item: Promotion;
  startDate: string;
  endDate: string;
  ngOnInit(): void {
    this.item = {...this.data};
    this.startDate = formatDate(this.item.startDate, 'yyyy-MM-dd', 'en');
    this.endDate = formatDate(this.item.endDate, 'yyyy-MM-dd', 'en');
  }

  onSubmit() {
    if (!this.item.id) {
      this.globalService.createPromotion(this.item.loyalPoint, this.item.discount, this.item.maxDiscountPrice, this.item.minAcceptOrderPrice, this.endDate, this.startDate).subscribe(data => {
        this.item.startDate = new Date(this.startDate);
        this.item.endDate = new Date(this.endDate);
        this.dialogRef.close(this.item);
      }, error => {
        alert('Create failed! Try again!');
      })
    } else {
      this.globalService.updatePromotion(this.item.id, this.item.loyalPoint, this.item.discount, this.item.maxDiscountPrice, this.item.minAcceptOrderPrice, this.endDate, this.startDate).subscribe(data => {
        this.item.startDate = new Date(this.startDate);
        this.item.endDate = new Date(this.endDate);
        this.dialogRef.close(this.item);
      }, error => {
        alert('Update failed! Try again!');
      })
    }
  }

}
