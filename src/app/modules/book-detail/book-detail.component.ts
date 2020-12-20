import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/_models/book';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  id: string;
  bookDetail: Book;

  constructor(private globalService: GlobalService,
    private router: Router,
    private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.globalService.getBook(this.id).subscribe(data => {
      this.bookDetail = data;
    });
  }

}
