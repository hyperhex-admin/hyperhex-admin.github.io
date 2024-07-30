import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
  }


  /**
   * compare(a, b, isAsc) => compare value base on sort wise
   * @param a in a value
   * @param b in b valua
   * @param isAsc in ascending & decending
   */
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  setLocalStore(key:any, data:any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getLocalStore(key:any) {
    // return JSON.parse(localStorage.getItem(key));
  }

  clearStorageFor(key:any) {
    return localStorage.removeItem(key);
  }

  clearStorage() {
    return localStorage.clear();
  }

  showLoading() {
    this.spinner.show();
  }

  hideLoading() {
    this.spinner.hide();
  }

  showSuccessToast(msg:any) {
    this.toastr.success(msg,'',{positionClass: 'toast-bottom-right' });
  }

  showErrorToast(msg:any) {
    this.toastr.error(msg,'',{positionClass: 'toast-bottom-right' });
  }

  showInfoToast(msg:any) {
    this.toastr.info(msg,'',{positionClass: 'toast-bottom-right' });
  }

  showAlert(error:any) {
    this.showInfoToast(error);
    // const alert = this.alertCtrl.create({
    //   message: error,
    //   title: "Alert",
    //   buttons: ['Ok']
    // });
    // alert.present();
  }

 

}
