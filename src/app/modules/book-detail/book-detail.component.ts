import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/_models/book';
import { Image } from 'src/app/_models/image';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  id: string;
  bookDetail: Book;
  image: Image[] = [];

  constructor(private globalService: GlobalService,
    private router: Router,
    private route: ActivatedRoute) {
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

}
