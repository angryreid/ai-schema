import { Component, OnInit, ElementRef } from '@angular/core';
import { interval } from 'rxjs';

import { Observable, of, switchMap } from 'rxjs';
import { map, catchError, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';

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
  response = {};
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  value = 0;
  seconds: number = 0;
  public allow = false;
  public displayProgressBar = false;
  public displayExportButton = true;
  public file: any;
  public inputfield: any;
  public browsefile: any;
  public resposne: ResponseData = { predictions: [] };


  getSchemaPageData(): void {
    this.showSchemaPage = false;
    this.schemaConfig = this.apiService.getSchemaJsonData(this.resposne);
  }

  ngAfterViewInit() {
    const dropArea = this.elementRef.nativeElement.querySelector('.drag-area');
    dropArea.addEventListener('dragover', (event: any) => {
      event.stopPropagation();
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      const fileType = event.dataTransfer.items[0].type;
      this.imageValidation(fileType);
      this.uploadImageInput(file);
    });

    this.browsefile = this.elementRef.nativeElement.querySelector('#browsefile');
    this.inputfield = document.querySelector('#inputfield')
  }

  imageValidation(fileType: any) {
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validExtensions.includes(fileType)) {
      alert('This is not an Image File!');
    } 
  }

  uploadImageInput(e: any) {
    const file = _.get(e, 'target.files[0]');
    this.imageValidation(_.get(e, 'target.files[0].type'));
   
    this.apiService.getYoloCustomedData(file).subscribe(res=>{
      console.log('get yolo identified data', res);
      if(res.statusCode===200){
        alert('Your design is uploaded success!!')
        this.resposne = res;
        this.allow = true
        this.getSchemaPageData();
      } 
    });
    // this.base64Convert(e);
  }

  // async base64Convert(e: any) { 
    // const file = _.get(e, 'target.files[0]');
   
    // const reader = new FileReader();

    // reader.addEventListener("load", () => {
    //   console.log('base64:', reader.result);
    //   this.apiService.getRoboflowTrainedData(reader.result).then((res) => {
    //     alert('Your design is uploaded success!!')
    //     this.response = res;
    //   });

    // if (file) { 
    //   reader.readAsDataURL(file);
    // }
  // })
// };


  dragStarted(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    console.log(event);
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
      // this.postFile(file).subscribe((res)=>{alert(res.message)});
      this.apiService.getYoloCustomedData(file).subscribe(res=>{
        console.log('get yolo identified data', res);
        if(res.statusCode===200){
          this.resposne = res;
          this.allow = true
          this.getSchemaPageData();
        } 
      });
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
   this.apiService.getJSONData();
    }
   
}
