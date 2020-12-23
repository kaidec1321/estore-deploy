import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/_models/cart';
import { GlobalInfo } from 'src/app/_models/info';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  globalInfo: GlobalInfo = new GlobalInfo();
  id: string = '';
  cart: Cart = new Cart();
  total: number = 0;
  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.getGlobalInfo().subscribe(data => {
      this.globalInfo = data;
      this.id = this.globalInfo.cart.id;
      this.globalService.getCart(this.id).subscribe(data => {
        this.cart = data;
        this.cart.cartBooks.map(item => this.globalService.getBook(item.bookId).subscribe(data => item.book = data[0]));
        this.total = this.cart.totalBookPrice;
      })
    });
  }

  decrease(item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotal();
    }
  }

  increase(item) {
    if (item.quantity < 10) {
      item.quantity++;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.total = this.cart.cartBooks.reduce((x, item) => x + item.quantity*item.book.pricePerUnit, 0);
  }

  updateCart() {
    this.cart.cartBooks.map(item => this.globalService.addToCart(item.bookId, item.quantity).subscribe(data => {
    },
    error => alert("Can't Update! Try again!")
    ));
  }
}
