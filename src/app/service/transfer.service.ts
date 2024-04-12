import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private functionCallSource = new Subject<void>();
  private _sharedData = new BehaviorSubject<any>(
    {
      'id': 0,
      'showModal': false,
      'showModalConfig': false,
      'showModalDelete': false,
      'idSignup': 0,
      'showModalSignup': false,
      'showModalNewPassword': false,
      'deleteFor': ''
    }
  );

  callReload$ = this.functionCallSource.asObservable();

  callReload() {
    this.functionCallSource.next();
  }

  sharedData$ = this._sharedData.asObservable();

  setId(i: number) {
    let val = this._sharedData.value;
    val.id = i;
    this._sharedData.next(val);
  }

  setIdSignup(i: number) {
    let val = this._sharedData.value;
    val.idSignup = i;
    this._sharedData.next(val);
  }

  setShowModal(boo: boolean) {
    if (!boo) {
      this.setShowModalConfig(boo);
      this.setShowModalDelete(boo);
      this.setShowModalNewPassword(boo);
      this.setShowModalSignup(boo);
    }
    let val = this._sharedData.value;
    val.showModal = boo;
    this._sharedData.next(val);
  }

  setShowModalConfig(boo: boolean) {
    let val = this._sharedData.value;
    val.showModalConfig = boo;
    this._sharedData.next(val);
  }

  setShowModalDelete(boo: boolean) {
    let val = this._sharedData.value;
    val.showModalDelete = boo;
    this._sharedData.next(val);
  }

  setShowModalSignup(boo: boolean) {
    let val = this._sharedData.value;
    val.showModalSignup = boo;
    this._sharedData.next(val);
  }

  setShowModalNewPassword(boo: boolean) {
    let val = this._sharedData.value;
    val.showModalNewPassword = boo;
    this._sharedData.next(val);
  }

  setDeleteFor(str: string) {
    let val = this._sharedData.value;
    val.deleteFor = str;
    this._sharedData.next(val);
  }
}
