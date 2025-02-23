import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'biotrade';
  constructor(private location: Location) {}

  // Reload the page or perform any other actions
  ngOnInit() {
    // this.location.subscribe(() => {
    //   window.location.reload();
    // });
  }
}
