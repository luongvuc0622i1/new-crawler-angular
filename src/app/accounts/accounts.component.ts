import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../service/api.service';
import { TransferService } from '../service/transfer.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  fullData: any;
  amount: number = 10;

  totalPages: number = 0;
  currentPage: number = 1;

  private subscription?: Subscription;

  constructor(private apiService: ApiService,
    private transferService: TransferService) { }

  ngOnInit(): void {
    this.onload(1);
    this.subscription = this.transferService.callReload$.subscribe(() => {
      this.onload(1);
    });
  }

  onload(curPage: number): void {
    this.apiService.getAccounts(curPage - 1, this.amount).subscribe(response => {
      this.totalPages = response.totalPages;

      let elToAdd = response.size - response.numberOfElements;
      this.fullData = [
        ...response.content,
        ...Array.from({ length: elToAdd }, () => ({}))
      ]
    }, () => {
      this.fullData = Array.from({ length: this.amount }, () => ({}));
    });
  }

  refresh(curPage: number): void {
    this.currentPage = curPage;
    this.onload(curPage);
  }

  edit(id: string): void {
    this.transferService.setIdSignup(parseInt(id));
    this.transferService.setShowModal(true);
    this.transferService.setShowModalSignup(true);
  }

  create() {
    this.transferService.setIdSignup(0);
    this.transferService.setShowModal(true);
    this.transferService.setShowModalSignup(true);
  }

  delete(id: number) {
    this.transferService.setIdSignup(id);
    this.transferService.setShowModal(true);
    this.transferService.setShowModalDelete(true);
    this.transferService.setDeleteFor('account');
  }
}
