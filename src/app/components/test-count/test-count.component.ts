import { CommonModule, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  Validation,
  Input,
  initTE,
  Datepicker,
  Select,
  Modal,
  Collapse,
} from 'tw-elements';
import { MainUIService } from '../../services/main-ui.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-test-count',
    imports: [CommonModule, FormsModule, NgClass],
    templateUrl: './test-count.component.html',
    styleUrl: './test-count.component.css'
})
export class TestCountComponent implements OnInit, OnDestroy {
  modelTestCount: any;
  companies$?: Observable<any[]>;
  companies: any[] = [];
  testCountSubscription?: Subscription;

  constructor(private mainUIService: MainUIService, private authService: AuthService) {
    // Initialize modelTestCount properties
    this.resetTestCountForm();
  }
  ngOnInit(): void {
    initTE(
      { Validation, Input, Datepicker, Select, Modal, Collapse },
      { allowReinits: true }
    );

    // disable future date
    const FromDate = document.getElementById(
      'FromDate-disable-future'
    );
    new Datepicker(FromDate, {
      disableFuture: true,
    });
    const ToDate = document.getElementById(
      'ToDate-disable-future'
    );
    new Datepicker(ToDate, {
      disableFuture: true,
    });
  }
  
  // Method to check if the companyID starts with a number
  isCompanyIDStartingWithNumber(companyID: string): boolean {
    return /^[a-zA-Z]/.test(companyID);
  }

  //============================= Test Count =============================

  // Add & Update Test Count
  onTestCountFormSubmit(): void {
    if (this.modelTestCount.FromDate && this.modelTestCount.ToDate) {
      const countData = new FormData();
      countData.append('FromDate', this.modelTestCount.FromDate);
      countData.append('ToDate', this.modelTestCount.ToDate);

      this.testCountSubscription = this.mainUIService
  .companyWiseTest(countData)
  .subscribe({
    next: (data) => {
      this.companies = [];
      this.companies$ = this.authService.getAllCompany();

      this.companies$.subscribe((companies) => {
        companies.forEach((c) => {
          const matchingData = data.find((d: any) => d.companyID == c.companyID);
          if (matchingData) {
            this.companies.push({
              id: c.companyID,
              name: c.name,
              count: matchingData.total
            });
          }
        });
      });
    }
  });

    }
  }

  // Reset Test Count Form
  resetTestCountForm(): void {
    this.modelTestCount = {
      FromDate: '',
      ToDate: '',
    };
    this.resetCompanies();
  }

  // Reset Test Count Form
  resetCompanies(): void {
    this.companies = []
  }

  //============================= Destroy All Subscription =============================
  ngOnDestroy(): void {
    this.testCountSubscription?.unsubscribe();
  }

}
