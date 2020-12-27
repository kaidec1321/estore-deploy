import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/_models/book';
import { Category } from 'src/app/_models/category';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../../_services/global.service';
declare var $: any;

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookDataOrigin: Book[];
  bookDataFilter: Book[];
  bookDataShow: Book[];
  category: Category[];
  noPage: number = 1;
  pageSize: number = 6;
  noBook: number = 0;
  categoryFilter: string;
  wordSearch: string = '';

  constructor(private globalService: GlobalService,
    private router: Router) { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('.select_option_dropdown').hide();
      $(".select_option_list").click(function () {
        $(this).parent(".select_option").children(".select_option_dropdown").slideToggle('100');
        $(this).find(".right").toggleClass("fas fa-caret-down, fas fa-caret-up");
      });


      $('.controls').on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
      }); 
    });
    this.globalService.getBookList().subscribe(data => {
      data = data.filter(item => !item.deleted);
      data.map(item => {
        if (item.discount) item.actualPrice = item.pricePerUnit*(1 - item.discount);
      });
      data.map(item => {if (item.bookImages.length) item.bookImages[0].imageSrc = `${environment.api}/${item.bookImages[0].imageSrc}`});
      this.bookDataFilter = this.bookDataOrigin = data;
      this.noBook = data.length;
      this.paging();
    });

    this.globalService.getAllCategory().subscribe(data => {
      this.category = data;
    });
    
  }

  paging() {
    this.bookDataShow = this.bookDataFilter.slice(0, this.pageSize*this.noPage);
  }

  openBookDetail(id) {
    this.router.navigate([`book/${id}`]);
  }

  loadMore() {
    this.globalService.announceLoading(true);
    this.noPage++;
    this.paging();
    this.globalService.announceLoading(false);
  }

  onCategoryClick(id) {
    if (this.categoryFilter == id) this.categoryFilter = null;
    else this.categoryFilter = id;
    this.filter();
  }

  filter() {
    this.bookDataFilter = this.bookDataOrigin.filter(item => (item.title && item.title.toLowerCase().includes(this.wordSearch.trim().toLowerCase())) || (item.author && item.author.toLowerCase().includes(this.wordSearch.trim().toLowerCase())) || (item.publisher && item.publisher.toLowerCase().includes(this.wordSearch.trim().toLowerCase())));
    if (this.categoryFilter) this.bookDataFilter = this.bookDataFilter.filter(item => item.categoryId == this.categoryFilter);
    this.noBook = this.bookDataFilter.length;
    this.noPage = 1;
    this.paging();
  }

}
