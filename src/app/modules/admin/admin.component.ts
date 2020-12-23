import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/_models/book';
import { GlobalService } from 'src/app/_services/global.service';
import { AddEditBookComponent } from '../add-edit-book/add-edit-book.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/_models/category';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { Order } from 'src/app/_models/order';
import { Promotion } from 'src/app/_models/promotion';
import { Customer } from 'src/app/_models/customer';
import { AddEditPromotionComponent } from '../add-edit-promotion/add-edit-promotion.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'author', 'publisher', 'size', 'date', 'noPage', 'action'];
  displayedColumnsCategory: string[] = ['name', 'description', 'action'];
  displayedColumnsOrder: string[] = ['customer', 'address', 'book', 'ship', 'total', 'status', 'action'];
  displayedColumnsPromotion: string[] = ['index', 'discount', 'pts', 'maxPrice', 'minValue', 'startDate', 'endDate', 'action'];
  displayedColumnsUser: string[] = ['email', 'name', 'addr', 'phone', 'action'];
  dataSource: MatTableDataSource<Book>;
  dataSourceCategory: MatTableDataSource<Category>;
  dataSourceOrder: MatTableDataSource<Order>;
  dataSourcePromotion: MatTableDataSource<Promotion>;
  dataSourceCustomer: MatTableDataSource<Customer>;
  categories: Category[] = [];
  status: string[] = ["new", "packed", "in transit", "delivered"];
  searchKey: string = '';

  currentState: number = 0;
  data: Book[] = [];
  displayBook: Book[] = [];
  title: string[] = ['Books List', 'Categories List', 'Orders List', 'Promotions List', 'Users List'];
  orders: Order[] = [];
  promotions: Promotion[] = [];
  customers: Customer[] = [];
  constructor(public dialog: MatDialog,
    private globalService: GlobalService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.globalService.announceAdmin(true);
    this.loadCategory();
    this.loadBook();

  }

  loadBook() {
    this.globalService.getBookList().subscribe(data => {
      this.data = data;
      this.displayBook = this.data.filter(item => !item.deleted);
      this.dataSource = new MatTableDataSource(this.displayBook);
    });
  }

  loadCategory() {
    this.globalService.getAllCategory().subscribe(data => {
      this.categories = data;
      this.dataSourceCategory = new MatTableDataSource(data);
    });
  }

  loadOrder() {
    this.globalService.getAllOrder().subscribe(data => {
      this.orders = data;
      this.dataSourceOrder = new MatTableDataSource(this.orders);
    });
  }

  loadPromotion() {
    this.globalService.getAllPromotion().subscribe(data => {
      this.promotions = data;
      this.promotions = this.promotions.filter(item => !item.isDeleted);
      this.dataSourcePromotion = new MatTableDataSource(this.promotions);
    });
  }

  loadUser() {
    this.globalService.getAllCustomer().subscribe(data => {
      this.customers = data;
      this.customers = this.customers.filter(item => !item.deleted);
      this.dataSourceCustomer = new MatTableDataSource(this.customers);
    });
  }

  changeState(state) {
    if (state == 2 && this.orders.length == 0) {
      this.loadOrder();
    }
    if (state == 3 && this.promotions.length == 0) this.loadPromotion();
    if (state == 4 && this.customers.length == 0) this.loadUser();
    this.currentState = state;
  }

  addNew() {
    switch (this.currentState) {
      case 0:
        this.addNewBook();
        break;
      case 1:
        this.addNewCategory();
        break;
      case 3:
        this.addNewPromotion();
        break;
    }
  }

  addNewBook() {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      data: { item: new Book(), categories: this.categories },
      height: '90vh'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.displayBook = [data].concat(this.displayBook);
        this.dataSource = new MatTableDataSource(this.displayBook);
      }
    });
  }

  addNewCategory() {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: { item: new Category(), categories: this.categories },
      height: '90vh'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.categories = [data].concat(this.categories);
        this.dataSourceCategory = new MatTableDataSource(this.categories);
      }
    });
  }

  addNewPromotion() {
    const dialogRef = this.dialog.open(AddEditPromotionComponent, {
      data: new Promotion(),
      width: '70vw',
      height: '90vh'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.promotions = [data].concat(this.promotions);
        this.dataSourcePromotion = new MatTableDataSource(this.promotions);
      }
    });
  }

  openEditDialog(item) {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      data: { item: item, categories: this.categories },
      height: '90vh'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.displayBook.splice(this.displayBook.findIndex(item => item.id == data.id), 1, data);
        this.dataSource = new MatTableDataSource(this.displayBook);
      }
    })
  }

  delete(id) {
    if (confirm("Do you want to delete this book?")) {
      this.globalService.deleteBook(id).subscribe(data => {
        let index = this.displayBook.findIndex(item => item.id == id);
        this.displayBook.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.displayBook);
      }, error => {
        alert("Fail to delete! Try again!");
      });
    }
  }

  deleteCategory(id) {
    if (confirm("Do you want to delete this category?")) {
      this.globalService.deleteCategory(id).subscribe(data => {
        let index = this.categories.findIndex(item => item.id == id);
        this.categories.splice(index, 1);
        this.dataSourceCategory = new MatTableDataSource(this.categories);
      }, error => {
        alert("Fail to delete! Try again!");
      });
    }
  }

  openEditCategoryDialog(item) {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: { item: item, categories: this.categories },
      height: '90vh'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.categories.splice(this.categories.findIndex(item => item.id == data.id), 1, data);
        this.dataSourceCategory = new MatTableDataSource(this.categories);
      }
    });
  }

  openEditPromotionDialog(element) {
    const dialogRef = this.dialog.open(AddEditPromotionComponent, {
      data: element,
      width: '70vw',
      height: '90vh'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.promotions.splice(this.promotions.findIndex(item => item.id == data.id), 1, data);
        this.dataSourcePromotion = new MatTableDataSource(this.promotions);
      }
    });
  }

  deletePromotion(id) {
    if (confirm("Do you want to delete this promotion?")) {
      this.globalService.deletePromotion(id).subscribe(data => {
        let index = this.promotions.findIndex(item => item.id == id);
        this.promotions.splice(index, 1);
        this.dataSourcePromotion = new MatTableDataSource(this.promotions);
      }, error => {
        alert("Fail to delete! Try again!");
      });
    }
  }

  updateOrder(id, status) {
    let nextStatus = this.status[this.status.findIndex(item => item = status) + 1]
    if (confirm(`Do you want to change this order status from \"${status}\" to \"${nextStatus}\"?`)) {
      this.globalService.updateOrder(id).subscribe(data => {
        let index = this.orders.findIndex(item => item.id == id);
        this.orders[index].status = nextStatus;
        this.dataSourceOrder = new MatTableDataSource(this.orders);
      }, error => {
        alert("Fail to update! Try again!");
      });
    }
  }

  deleteUser(id) {
    this.globalService.deleteCustomer(id).subscribe(data => {
      let index = this.customers.findIndex(item => item.id == id);
      this.customers.splice(index, 1);
      this.dataSourceCustomer = new MatTableDataSource(this.customers);
    }, error => {
      alert("Fail to change status! Try again!");
    });
  }

  onSearch() {
    switch (this.currentState) {
      case 0:
        this.dataSource.filter = this.searchKey.trim().toLowerCase();
        break;
      case 1:
        this.dataSourceCategory.filter = this.searchKey.trim().toLowerCase();
        break;
      case 2:
        this.dataSourceOrder.filter = this.searchKey.trim().toLowerCase();
        break;
      case 3:
        this.dataSourcePromotion.filter = this.searchKey.trim().toLowerCase();
        break;
      case 4:
        this.dataSourceCustomer.filter = this.searchKey.trim().toLowerCase();
        break;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.globalService.announceAdmin(false);
  }
}
