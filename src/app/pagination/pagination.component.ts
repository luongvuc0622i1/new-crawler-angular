import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  // @ts-ignore
  @Input() totalPages;
  // @ts-ignore
  @Input() currentPage;
  @Output() refresh = new EventEmitter<number>();

  pageNumbers: any[] = [];
  amountDisplay: number = 5; // 5 phần tử ở khoảng giữa - phải là số lẻ

  ngOnInit(): void {
    this.sub();
  }

  // ngOnChanges(): void {
  //   this.sub();
  // }

  sub(): void {
    const amountNum = this.amountDisplay - 1;
    const totalPages = this.totalPages;
    let currentPage = this.currentPage;

    // Tạo mảng số trang
    this.pageNumbers = [];

    // Đảm bảo không bị vượt quá trang hiện tại hoặc trang cuối cùng
    let startPage = Math.max(2, currentPage - (amountNum / 2));
    let endPage = Math.min(totalPages - 1, currentPage + (amountNum / 2));

    // Xử lý trường hợp đặc biệt khi trang hiện tại là một trong ba phần tử đầu hoặc cuối của mảng
    if (startPage === 2) {
      endPage = Math.min(totalPages - 1, startPage + amountNum);
    } else if (endPage === totalPages - 1) {
      startPage = Math.max(2, endPage - amountNum);
    }

    // Đảm bảo luôn có 5 phần tử ở khoảng giữa
    while (endPage - startPage < amountNum && (startPage > 2 || endPage < totalPages - 1)) {
      if (startPage > 2) {
        startPage--;
      } else {
        endPage++;
      }
    }

    // Thêm các trang vào mảng
    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    }
  }

  firstPage() {
    this.currentPage = 1;
    this.refresh.emit(this.currentPage);

    this.sub();
  }

  prevPage() {
    this.currentPage -= 1;
    this.refresh.emit(this.currentPage);
    
    this.sub();
  }

  choosePage(num: number) {
    this.currentPage = num;
    this.refresh.emit(this.currentPage);
    
    this.sub();
  }

  nextPage() {
    this.currentPage += 1;
    this.refresh.emit(this.currentPage);
    
    this.sub();
  }

  lastPage() {
    this.currentPage = this.totalPages;
    this.refresh.emit(this.currentPage);
    
    this.sub();
  }
}
