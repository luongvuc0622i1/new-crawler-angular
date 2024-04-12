import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { TransferService } from '../../service/transfer.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.css'
})
export class ModalDeleteComponent {
  id: number = 0;
  idAccount: number = 0;
  deleteFor: string = '';
  @Output() closeModal = new EventEmitter<void>();

  constructor(private apiService: ApiService,
    private transferService: TransferService) { }

  ngOnInit(): void {
    this.transferService.sharedData$.subscribe((data) => {
      this.deleteFor = data.deleteFor;
      this.id = data.id;
      this.idAccount = data.idSignup;
    });
  }

  yes() {
    if (this.id && this.deleteFor === 'config') {
      this.apiService.delete(this.id).subscribe(data => {
        this.onload1();
        this.closeModal.emit();
        console.log('dung')
      }, () => {
        // this.showModalFailed = true;
        console.log('sai')
      });
    } else if (this.idAccount && this.deleteFor === 'account') {
      this.apiService.deleteAccount(this.idAccount).subscribe(response => {
        // this.onload2();
        window.location.reload();
      });
    }
  }

  onload1() {
    this.transferService.callReload();
  }

  no() {
    this.closeModal.emit();
  }
}