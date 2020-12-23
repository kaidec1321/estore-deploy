import { Component, OnInit } from '@angular/core';
import { GlobalInfo } from 'src/app/_models/info';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private globalService: GlobalService) {}

  user: GlobalInfo = new GlobalInfo();
  email: string = '';
  ngOnInit(): void {
    this.globalService.getGlobalInfo().subscribe(data => {
      this.user = data;
    })
  }

  updateInfo() {
  }

}
