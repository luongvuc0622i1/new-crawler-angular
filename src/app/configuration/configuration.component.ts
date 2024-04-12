import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { TransferService } from '../service/transfer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  loading: boolean = false;

  fullData: any;
  amount: number = 10;

  totalPages: number = 0;
  currentPage: number = 1;

  private subscription?: Subscription;

  constructor(private apiService: ApiService,
    private router: Router,
    private transferService: TransferService) { }

  ngOnInit(): void {
    this.onload(1);
    this.subscription = this.transferService.callReload$.subscribe(() => {
      this.onload(1);
    });
  }

  onload(curPage: number): void {
    this.apiService.getPages(curPage - 1, this.amount).subscribe(response => {
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

  crawler(item: any): void {
    this.loading = true;
    if (item.type === 'bds' || item.type === 'auto') {
      let crawlerFunction;
      switch (item.type) {
        case 'bds':
          crawlerFunction = this.apiService.crawlerBds;
          break;
        case 'auto':
          crawlerFunction = this.apiService.crawlerAuto;
          break;
        default:
          break;
      }
      if (crawlerFunction) {
        crawlerFunction(parseInt(item.id)).subscribe(response => {
          this.refresh(1);
          this.loading = false;
        }, () => { });
      }
    }
  }

  navi(item: any): void {
    this.router.navigate(['/' + item.type, item.id]);
  }

  config(id: string): void {
    this.transferService.setId(parseInt(id));
    this.transferService.setShowModalConfig(true);
    this.transferService.setShowModal(true);
  }

  create(): void {
    this.transferService.setId(0);
    this.transferService.setShowModalConfig(true);
    this.transferService.setShowModal(true);
  }
}
