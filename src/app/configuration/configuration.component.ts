import { Component, ElementRef, HostListener } from '@angular/core';
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

  visible = false;

  private subscription?: Subscription;

  constructor(private apiService: ApiService,
    private router: Router,
    private transferService: TransferService,
    private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.onload();
    this.subscription = this.transferService.callReload$.subscribe(() => {
      this.onload();
    });
  }

  onload(): void {
    this.apiService.getPages(this.currentPage - 1, this.amount).subscribe(response => {
      this.totalPages = response.totalPages;
      this.fullData = response.content;
    }, () => {
      this.fullData = Array.from({ length: this.amount }, () => ({}));
    });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  
  onClick(navi: string) {
    this.router.navigate(['/' + navi]);
  }

  refresh(curPage: number): void {
    this.currentPage = curPage;
    this.onload();
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

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollableDiv = this.elementRef.nativeElement.querySelector('.scrollable-div');
    if (scrollableDiv.scrollTop + scrollableDiv.clientHeight >= scrollableDiv.scrollHeight) {
      // console.log('Bạn đã cuộn đến cuối cùng của thẻ div!');
      // Gọi hàm hoặc thực hiện hành động mong muốn ở đây
      const currentScrollPosition = scrollableDiv.scrollHeight;
      this.currentPage = this.currentPage + 1;
      // this.onload();
      this.apiService.getPages(this.currentPage - 1, this.amount).subscribe(response => {
        this.fullData = this.fullData.concat(response.content);
      }, () => { });

      scrollableDiv.scrollTo({
        top: currentScrollPosition,
        behavior: 'auto'
      });
    }
  }
}
