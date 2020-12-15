import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentState: number = 0;
  title: string[] = ['Books List', 'Orders List', 'Users List'];
  constructor() { }

  ngOnInit(): void {
  }

  changeState(state) {
    this.currentState = state;
  }

}
