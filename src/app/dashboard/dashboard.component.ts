import { Component, OnInit, ElementRef } from '@angular/core';
import { interval } from 'rxjs';

import { Observable, of, switchMap } from 'rxjs';
import { map, catchError, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
import {ApiService} from '../services/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient,
    private elementRef: ElementRef,
    private apiService: ApiService
  ) {
    }
  public fileName: string = "";
  public fileLastModifyTime: string = "";
  loading: boolean = true;
  response = {};
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000)
  }

  value = 0;
  seconds: number = 0;
  public displayProgressBar = false;
  public displayExportButton = true;
  public file: any;
  public inputfield: any;
  public browsefile: any;


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
    this.apiService.getRoboflowTrainedData(file).then((res) => {
      alert('Your design is uploaded success!!')
      this.response = res;
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
      this.postFile(file).subscribe((res) => { alert(res.message) });
    }
  }
  convert() {
    this.displayProgressBar = !this.displayProgressBar;
    const time = 60;
    const timer$ = interval(1000);

    const subscribe = timer$.subscribe(second => {
      this.value = (second * 300) / 30;
      this.seconds = second;

      if (this.seconds === 11) {
        subscribe.unsubscribe();
        this.displayProgressBar = !this.displayProgressBar;
        this.displayExportButton = !this.displayExportButton;
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



}
