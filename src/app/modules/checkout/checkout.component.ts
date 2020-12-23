import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/_models/order';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  orders: Order[] = [];

  constructor(private globalService: GlobalService,
    private router: Router) { }

  ngOnInit(): void {
    this.globalService.getMyOrder().subscribe(data => {
      this.orders = data;
      this.orders.map(item => {
        item.total = item.totalBookPrice + item.shippingPrice + item.tax;
        if (item.promotion) {
          let discount = item.total * item.promotion.discount;
          if (discount > item.promotion.maxDiscountPrice) discount = item.promotion.maxDiscountPrice;
          item.total -= discount;
        } 
      })
    })
  }

}
