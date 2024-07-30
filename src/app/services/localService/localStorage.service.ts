import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { ENCRDECR } from 'src/app/constants/constants';
import { EncrDecrService } from '../encr-decr.service';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor(private EncrDecr: EncrDecrService) { }

  getDataFromIndexedDB(key) {
    return new Promise((resolve, reject) => {
      localforage.getItem(key)
        .then((result: any) => {
          var decValue;
          if(result != null && result !== undefined){
            decValue = this.EncrDecr.get(ENCRDECR.ENCRDECR_CODE,result.replace(/XYZ/g, "/"));
          }else{
            decValue = result;
          }
          
          resolve(JSON.parse(decValue));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  setDataInIndexedDB(key, value) {
    var encValue = value;
   
   if(value !== null && value !== undefined){
     encValue = this.EncrDecr.set(ENCRDECR.ENCRDECR_CODE, JSON.stringify(value)).replace(/\//g,'XYZ');
   }
    return localforage.setItem(key, encValue)
      .then(() => { })
      .catch(() => { });
  }

  clearDataFromIndexedDB() {
    return localforage.clear();
  }

  clearStorage() {
    localStorage.clear();
  }

  removeItem(key) {
    return localforage.removeItem(key).then(() => { })
      .catch(() => { });
  }
}
