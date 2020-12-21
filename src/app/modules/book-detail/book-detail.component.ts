import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/_models/book';
import { Image } from 'src/app/_models/image';
import { GlobalService } from 'src/app/_services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  quantity: number = 1;
  id: string;
  bookDetail: Book = new Book();
  image: Image[] = [];

  constructor(private globalService: GlobalService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.globalService.announceLoading(true);
    this.globalService.getBook(this.id).subscribe(data => {
      this.bookDetail = data[0];
      this.image = this.bookDetail.bookImages;
      this.globalService.announceLoading(false);
    });
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increase() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  addToCart() {
    this.globalService.addToCart(this.id, this.quantity).subscribe(data => {
      this.snackBar.open("Add to cart", "Checkout", {
        duration: 4000
      });

      this.snackBar._openedSnackBarRef.onAction().subscribe(
        () => {
          this.router.navigate(['/cart']);
        }
      );
    });
  }
}
