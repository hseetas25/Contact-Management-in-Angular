import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  edit: boolean;
  dateToday: Date = new Date();
  ngOnInit(): void {
    this.edit = false;
    if (localStorage.getItem("id")=="-1") {
      this.edit = false;
    }
    else {
      this.edit = true;
    }
  }
}
