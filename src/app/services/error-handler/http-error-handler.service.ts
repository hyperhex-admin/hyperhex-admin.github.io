import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { NotificationAlertService } from '../notification.service';
import { LocalStorageService } from '../localService/localStorage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})

export class HttpErrorHandler {

  public mobileNotverified = new BehaviorSubject<any>(null);
  public emailNotverified = new BehaviorSubject<any>(null);

  constructor(
    private notificationService: NotificationAlertService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  async handleError(serviceName, error: HttpErrorResponse, isErrorDisplay?) {
    const errorMessage = error.error.error || error.error.message;
    if (error.error.data && error.error.data.isMobileVerified === 0) {
      this.mobileNotverified.next(true);
      this.emailNotverified.next(false);
    } else if (error.error.data && error.error.data.isEmailVerified === 0) {
      if (error.error.data.isMobileVerified) {
        this.mobileNotverified.next(false);
        this.emailNotverified.next(true);
      }
    }
    if (errorMessage && !isErrorDisplay) {
      this.notificationService.showError(errorMessage);
    }
    this.spinner.hide();
    switch (error.status) {
      case 400:
        return throwError(error);
      case 401:
        localStorage.clear();
        this.localStorageService.clearDataFromIndexedDB();
        this.router.navigate(['/']);
        return;
      case 403:
        this.router.navigate(['/home/dashboard']);
        return throwError(error);
      case 404:
        return throwError(error);
      case 500:
        return throwError(error);
      default:
    }

    return throwError(error);
  }
}
