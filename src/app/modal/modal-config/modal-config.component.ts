import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { TransferService } from '../../service/transfer.service';

@Component({
  selector: 'app-modal-config',
  templateUrl: './modal-config.component.html'
})
export class ModalConfigComponent {
  @Output() closeModal = new EventEmitter<void>();
  id: number = 0;
  statusName: string = '';
  statusUrl: string = '';
  statusCategory: string = '';
  statusSpider: string = '';
  formConfiguration: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    url: new FormControl(),
    spider: new FormControl(),
    category: new FormControl(),
  });
  categoriesList: any = [];
  arr: string[] = ['name', 'url', 'spider', 'category'];
  constructor(private apiService: ApiService,
    private transferService: TransferService) { }

  ngOnInit(): void {
    this.apiService.getAllCategories().subscribe(response => {
      this.categoriesList = response;
    });
    this.transferService.sharedData$.subscribe((data) => {
      this.id = data.id;
    });
    if (!this.id) return;
    this.apiService.getPage(this.id).subscribe(response => {
      this.formConfiguration.patchValue({
        'id': this.id,
        'name': response.name,
        'url': response.url,
        'spider': response.spider_url,
        'category': response.type,
      });
      this.check();
    });
  }

  ngDoCheck(): void {
    this.check();
  }

  check(): void {
    this.arr.forEach(element => {
      const inputField = document.getElementById(element) as HTMLInputElement;
      const label = inputField.previousElementSibling as HTMLElement;

      if (this.formConfiguration.value[element] && label) {
        label.classList.add('input-label');
      }
    });
  }

  ngAfterViewInit(): void {
    this.arr.forEach(element => {
      const inputField = document.getElementById(element) as HTMLInputElement;
      const label = inputField.previousElementSibling as HTMLElement;

      inputField.addEventListener('focus', () => {
        if (label) {
          label.classList.add('input-label');
        }
      });

      inputField.addEventListener('blur', () => {
        if (inputField.value === '' && label) {
          label.classList.remove('input-label');
        }
      });
    });
  }

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    if (!event.target.files[0]) return;
    this.selectedFile = event.target.files[0] as File;
    this.formConfiguration.patchValue({
      'spider': this.selectedFile.name
    });
  }

  triggerFileInput() {
    document.getElementById('fileInput')?.click();
  }

  save() {
    this.formatName();
    this.formatUrl();
    this.formatSpider();
    this.formatCategory();
    if (this.statusName || this.statusUrl || this.statusSpider || this.statusCategory) return;
    const formData: FormData = new FormData();
    formData.append('name', this.formConfiguration.value.name);
    formData.append('url', this.formConfiguration.value.url);
    formData.append('type', this.formConfiguration.value.category);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
      if (this.formConfiguration.value.id) {
        this.apiService.update(formData, this.formConfiguration.value.id).subscribe(data => {
          // this.showModalSuccessfully = true;
          this.onload();
          this.closeModal.emit();
        }, () => {
          // this.showModalFailed = true;
        });
      } else {
        this.apiService.create(formData).subscribe(data => {
          // this.showModalSuccessfully = true;
          this.onload();
          this.closeModal.emit();
        }, () => {
          // this.showModalFailed = true;
        });
      }
    } else {
      this.apiService.updateNoFile(formData, this.formConfiguration.value.id).subscribe(data => {
        // this.showModalSuccessfully = true;
        this.onload();
        this.closeModal.emit();
      }, () => {
        // this.showModalFailed = true;
      });
    }
  }

  formatName() {
    if (!this.formConfiguration.value.name) {
      this.statusName = 'Name is require';
    } else this.statusName = '';
  }

  formatUrl() {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (!this.formConfiguration.value.url) {
      this.statusUrl = 'Url is require';
    } else if (!urlRegex.test(this.formConfiguration.value.url)) {
      this.statusUrl = 'Url format is not correct';
    } else this.statusUrl = '';
  }

  formatCategory() {
    if (!this.formConfiguration.value.category) {
      this.statusCategory = 'Category is require';
    } else this.statusCategory = '';
  }

  formatSpider() {
    if (!this.formConfiguration.value.spider) {
      this.statusSpider = 'Spider is require';
    } else this.statusSpider = '';
  }

  back() {
    this.closeModal.emit();
  }

  onload() {
    this.transferService.callReload();
  }
}
