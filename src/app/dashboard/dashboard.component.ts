import { Component, OnInit, ElementRef } from '@angular/core';
import { interval } from 'rxjs';

import { Observable, of, switchMap } from 'rxjs';
import { map, catchError, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'console';
import { Layout } from '../models/layout.modle';
import { ApiService } from '../services/api.service';
import { ResponseData } from '../services/common.type';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private elementRef: ElementRef,
    private apiService: ApiService
  ) { }
  public fileName: string = "";
  public fileLastModifyTime: string = "";
  public showSchemaPage: boolean = true;
  public schemaConfig: Layout = {};
  loading: boolean = true;
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  value = 0;
  seconds: number = 0;
  allow = false;
  public displayProgressBar = false;
  public displayExportButton = true;
  public file: any;
  public inputfield: any;
  public browsefile: any;
  public resposne: ResponseData = { predictions: [] };


  getSchemaPageData() {
    this.showSchemaPage = false;
    this.schemaConfig = this.apiService.getSchemaJsonData(this.resposne);
  }

  ngAfterViewInit() {
    const dropArea = this.elementRef.nativeElement.querySelector('.drag-area');
    dropArea.addEventListener('dragover', (event: any) => {
      this.file = event.dataTransfer.files[0];
      const fileType = event.dataTransfer.items[0].type;

      const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
      if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
          let fileUrl = fileReader.result;
          let imgTag = `<img src="${fileUrl}" alt="">`;
          dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(this.file);
      } else {
        alert('This is not an Image File!');
      }
      console.log('sss', this.file)
    });

    this.browsefile = this.elementRef.nativeElement.querySelector('#browsefile');
    this.inputfield = this.elementRef.nativeElement.querySelector('#inputfield');
  }

  browsefileEvent(event: any) {
    this.inputfield.click();
  }

  handleFileInput(event: any) {
    console.log(event.target.files[0]);
    const file: any = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.fileLastModifyTime = file.lastModifiedDate.toString();
      // const formData: FormData = new FormData();
      // formData.append('picFile', file);
      // const upload$ = this.http.post("http://127.0.0.1:5000/up_file",formData);
      // upload$.subscribe();
      this.postFile(file).subscribe((res) => { alert(res.message) });
    }
  }
  convert() {
    this.displayProgressBar = !this.displayProgressBar;
    const time = 60;
    const timer$ = interval(1000);

    const subscribe = timer$.subscribe(second => {
      this.allow = false;
      this.value = (second * 300) / 30;
      this.seconds = second;

      if (this.seconds === 11) {
        subscribe.unsubscribe();
        this.displayProgressBar = !this.displayProgressBar;
        // this.displayExportButton = !this.displayExportButton;
        var path = 'ai-schema-template.json';
        this.http.get<any>('assets/output/' + path).subscribe(data => {
          if (data != null) {
            this.allow = true;
          }
        });
      }
    });
  }

  postFile(fileToUp: File): Observable<{ message: string }> {
    const url: string = "http://127.0.0.1:5000/up_file";
    const formData: FormData = new FormData();
    formData.append('picFile', fileToUp);
    return this.http
      .post<any>(url, formData).pipe(
        switchMap((res: { message: string }) => { console.log(res); return of(res); })
      );
  }

  export() {
    var path = 'ai-schema-template.json';
    this.http.get<any>('assets/output/' + path).subscribe(data => {
      console.log(data);
      const jsonData = JSON.stringify(data);
      const blob = new Blob([jsonData], { type: 'application/json' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'ai-schema-template.json';
      link.click();
    });
  }
}
