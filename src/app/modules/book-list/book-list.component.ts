import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/_models/book';
import { Category } from 'src/app/_models/category';
import { GlobalService } from '../../_services/global.service';
declare var $: any;

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookDataOrigin: Book[];
  bookDataShow: Book[];
  category: Category[];

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
      this.bookDataShow = this.bookDataOrigin = data; 
    });

    this.globalService.getAllCategory().subscribe(data => {
      this.category = data.data;
    })
  }

  openBookDetail(id) {
    this.router.navigate([`book/${id}`]);
  }

}
