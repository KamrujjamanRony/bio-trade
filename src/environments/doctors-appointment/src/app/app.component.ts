import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, HttpClientModule],
})
export class AppComponent implements OnInit {
  title = 'The doctor-appointment';

  constructor( ) { }

  ngOnInit(): void {
    AOS.init({
      once: true,
      duration: 450,
      delay: 250,
      disable: 'mobile'
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.refresh()
    }, 500)
  }
}
