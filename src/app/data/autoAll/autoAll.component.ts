import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-autoAll',
  templateUrl: './autoAll.component.html'
})
export class AutoAllComponent {
  loading: boolean = true;

  fullData: any;
  amount: number = 50;

  key: string = '';

  totalPages: number = 0;
  currentPage: number = 1;

  sortBy: string[] = [];
  colDate: boolean = false;
  colTitle: boolean = false;
  colDetail: boolean = false;
  colGear: boolean = false;
  colEngine: boolean = false;
  colType: boolean = false;
  colPrice: boolean = false;

  visible = false;
  category: string = '';

  constructor(private router: Router,
    private apiService: ApiService,
    private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.onload();
    this.category = this.router.url.split('/')[1] === 'home' ? 'bds' : this.router.url.split('/')[1];
  }

  onload(): void {
    this.loading = true;
    if (!this.sortBy.length) {
      this.colDate = true;
      this.sortBy.push('date');
    }
    this.apiService.getAutoAllItems(this.currentPage - 1, this.amount, this.key, this.sortBy.join(",")).subscribe(response => {
      this.totalPages = response.totalPages;
      this.fullData = response.content;
      this.loading = false;
    }, () => {
      this.fullData = Array.from({ length: 5 }, () => ({}));
      this.loading = false;
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

  onInputChange(): void {
    this.currentPage = 1;
    this.onload();
  }

  handleSelected(): void {
    this.currentPage = 1;
    this.onload();
  }

  navi(id: string): void {
    this.router.navigate(['/auto', id]);
  }

  removeElementFromArray<T>(arr: T[], element: T): T[] {
    const index = arr.indexOf(element);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  sortDate(): void {
    if (!this.colDate) {
      this.colDate = true;
      this.sortBy.push('date');
    } else {
      this.colDate = false;
      this.sortBy = this.removeElementFromArray(this.sortBy, 'date');
    }
    this.currentPage = 1;
    this.onload()
  }

  sortTitle(): void {
    if (!this.colTitle) {
      this.colTitle = true;
      this.sortBy.push('title');
    } else {
      this.colTitle = false;
      this.sortBy = this.removeElementFromArray(this.sortBy, 'title');
    }
    this.currentPage = 1;
    this.onload()
  }

  sortDetail(): void {
    if (!this.colDetail) {
      this.colDetail = true;
      this.sortBy.push('detail');
    } else {
      this.colDetail = false;
      this.sortBy = this.removeElementFromArray(this.sortBy, 'detail');
    }
    this.currentPage = 1;
    this.onload()
  }

  sortGear(): void {
    if (!this.colGear) {
      this.colGear = true;
      this.sortBy.push('gear');
    } else {
      this.colGear = false;
      this.sortBy = this.removeElementFromArray(this.sortBy, 'gear');
    }
    this.currentPage = 1;
    this.onload()
  }

  sortEngine(): void {
    if (!this.colEngine) {
      this.colEngine = true;
      this.sortBy.push('engine');
    } else {
      this.colEngine = false;
      this.sortBy = this.removeElementFromArray(this.sortBy, 'engine');
    }
    this.currentPage = 1;
    this.onload()
  }

  sortType(): void {
    if (!this.colType) {
      this.colType = true;
      this.sortBy.push('type');
    } else {
      this.colType = false;
      this.sortBy = this.removeElementFromArray(this.sortBy, 'type');
    }
    this.currentPage = 1;
    this.onload()
  }

  sortPrice(): void {
    if (!this.colPrice) {
      this.colPrice = true;
      this.sortBy.push('price');
    } else {
      this.colPrice = false;
      this.sortBy = this.removeElementFromArray(this.sortBy, 'price');
    }
    this.currentPage = 1;
    this.onload()
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollableDiv = this.elementRef.nativeElement.querySelector('.scrollable-div');
    if (scrollableDiv.scrollTop + scrollableDiv.clientHeight >= scrollableDiv.scrollHeight) {
      console.log('Bạn đã cuộn đến cuối cùng của thẻ div!');
      // Gọi hàm hoặc thực hiện hành động mong muốn ở đây
      const currentScrollPosition = scrollableDiv.scrollHeight;
      this.currentPage = this.currentPage + 1;
      // this.onload();
      if (!this.sortBy.length) {
        this.colDate = true;
        this.sortBy.push('date');
      }
      this.apiService.getAutoAllItems(this.currentPage - 1, this.amount, this.key, this.sortBy.join(",")).subscribe(response => {
        this.fullData = this.fullData.concat(response.content);
      }, () => { });

      scrollableDiv.scrollTo({
        top: currentScrollPosition,
        behavior: 'auto'
      });
    }
  }
}
