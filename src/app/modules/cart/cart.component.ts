import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/_models/cart';
import { GlobalInfo } from 'src/app/_models/info';
import { Promotion } from 'src/app/_models/promotion';
import { GlobalService } from 'src/app/_services/global.service';
import { environment } from 'src/environments/environment';

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
  promotions: Promotion[] = [];
  shippingPrice: number = 5;
  discount: number = 0;
  address: string;
  selectedPromotion: Promotion;
  loyalPts: number;
  listShipTwo: string[] = ['HCM', 'TG', 'LA', 'CT', 'BT'];
  freeship: boolean = false;
  constructor(private globalService: GlobalService,
    private router: Router) { }

  ngOnInit(): void {
    this.globalService.getGlobalInfo().subscribe(data => {
      this.globalInfo = data;
      this.id = this.globalInfo.cart.id;
      this.globalService.getCart(this.id).subscribe(data => {
        this.cart = data;
        if (this.cart.cartBooks.length == 0) {
          alert("Your cart is empty! Please buy some!");
          this.router.navigate(['/book-list']);
        }
        this.cart.cartBooks.map(item => this.globalService.getBook(item.bookId).subscribe(data => {
          data.map(item => item.bookImages[0].imageSrc = `${environment.api}/${item.bookImages[0].imageSrc}`);
          item.book = data[0];
          if (item.book.discount) item.book.actualPrice = item.book.pricePerUnit*(1- item.book.discount / 100.00);
        }));
        this.total = this.cart.totalBookPrice;
        this.freeship = (this.total >= 300);
        this.checkAddress();
      });
      this.globalService.getAllPromotion().subscribe(data => {
        this.promotions = data;
        this.promotions = this.promotions.filter(item => !item.isDeleted);
        
      });
      this.globalService.getGlobalInfo().subscribe(data => {
        this.loyalPts = data.loyalPoint;
      })
    });
  }

  decrease(item) {
    if (item.quantity > 0) {
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
    this.total = this.cart.cartBooks.reduce((x, item) => x + item.quantity*item.book.pricePerUnit*(1-item.book.discount/100.00), 0);
    this.freeship = (this.total >= 300);
    this.checkAddress();
  }

  updateCart() {
    this.cart.cartBooks.map(item => this.globalService.addToCart(item.bookId, item.quantity).subscribe(data => {
    },
    error => alert("Can't Update! Try again!")
    ));
  }

  check(promotion) {
    return this.total <= promotion.minAcceptOrderPrice || this.loyalPts < promotion.loyalPoint;
  }

  checkAddress() {
    if (this.freeship) {
      this.shippingPrice = 0;
    }
    else {
      if (this.listShipTwo.some(item => this.address.toLowerCase().includes(item.toLowerCase()))) this.shippingPrice = 2;
      else this.shippingPrice = 5;
    }
  }

  choosePromotion() {
    if (this.selectedPromotion) {
      this.discount = this.total*this.selectedPromotion.discount;
      if (this.discount > this.selectedPromotion.maxDiscountPrice) this.discount = this.selectedPromotion.maxDiscountPrice;
    }
  }

  updateOrder() {
    this.globalService.createOrder(1, this.shippingPrice, this.address).subscribe(data => {
      alert('Create Order Successfully!');
      this.router.navigate(['/order']);
    }, error => alert("Create Order Failed! Try Again!"))
  }
}
