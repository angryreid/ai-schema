import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import axios from 'axios';
import { ResponseData } from './common.type';
import { SchemaData } from '../models/layout.modle';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public YoloURL: string = 'http://127.0.0.1:5000/file_rec';
  public RoboFlowURL: string =
    'https://detect.roboflow.com/angular-material-component-model/7';
  public storeDataAPI: string = 'http://127.0.0.1:5000/data_store';
  public downloadJSONAPI: string = 'http://127.0.0.1:5000/download-json';
  public getImageAPI: string = 'http://127.0.0.1:5000/get-image';

  public getImageURL(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(this.getImageAPI, formData).pipe(
      take(1),
      map((res) => res)
    );
  }

  public getRoboFlowData(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(this.RoboFlowURL, formData).pipe(
      map((res) => {
        console.log('Image uploaded successfully!');
        return res;
      })
    );
  }

  // create a function to return a observable like of({})
  public getMockData(): Observable<any> {
    return of({
      predictions: [
        {
          class: 'button_basic',
          confidence: 0.999,
          height: 0.1,
          width: 0.1,
          x: 0.1,
          y: 0.1,
        },
        {
          class: 'button_primary',
          confidence: 0.999,
          height: 0.1,
          width: 0.1,
          x: 0.1,
          y: 0.1,
        },
      ],
    });
  }

  // create a function to return a observable like of({})
  public getMockData2(): Observable<any> {
    return of({
      predictions: [
        {
          class: 'card',
          confidence: 0.999,
          height: 0.1,
          width: 0.1,
          x: 0.1,
          y: 0.1,
        },
      ],
    });
  }

  /**
   * create a function `combineMock` to use combinelaest to combine two observable as below
   * observable1: getMockData
   * observable2: getMockData2
   */

  public combineMock(): Observable<any> {
    return combineLatest([this.getMockData(), this.getMockData2()]).pipe(
        map(([res1, res2]) => {
            return {
                predictions: [...res1.predictions, ...res2.predictions]
            }
        })
      );
    }
  /*
    use example:
    this.api.getYoloCustomedData(file).subscribe(
              res => console.log('fetch response successfully', res)
            );
    */
  public getYoloCustomedData(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(this.YoloURL, formData).pipe(
      map((res) => {
        console.log('Image uploaded successfully!');
        return res;
      })
    );
  }

  /*
    use example:
     from(this.api.getRoboflowTrainedData(file)).pipe(
              switchMap(res=>res)).subscribe(
            (res: any) => console.log('fetch response successfully', res))
    */
  public async getRoboflowTrainedData(file: File): Promise<Observable<any>> {
    const loadImageBase64 = (data: Blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
    const image = await loadImageBase64(file);
    return new Observable((observer) => {
      axios({
        method: 'POST',
        url: 'https://detect.roboflow.com/angular-material-component-model/7',
        params: {
          api_key: 'ec7ZLY3vikxjIYZuPkim',
        },
        data: image,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(function (response) {
          console.log(response.data);
          observer.next(response.data);
          observer.complete();
        })
        .catch(function (error) {
          console.log(error.message);
        });
    });
  }

  public storeJSONData(data: SchemaData, fileName: string): void {
    const params = {
      data: data,
      fileName: fileName,
    };
    this.http
      .post(this.storeDataAPI, params)
      .pipe(take(1))
      .subscribe((res) => console.log('store data successfully', res));
  }

  public getJSONData(): void {
    this.http
      .get(this.downloadJSONAPI)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('download data successfully', res);
        const jsonData = JSON.stringify(res);
        // Create a Blob from the JSON data
        const blob = new Blob([jsonData], { type: 'application/json' });
        // Create a download link and trigger a download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'ai-schema-template.json';
        link.click();
      });
  }

  public getSchemaJsonData(resposne: ResponseData, name: string = 'template') {
    const tempSchema: SchemaData = {
      id: 'ai-schema-' + name,
      layout: {
        header: {
          children: [],
        },
        body: {
          children: [],
        },
        footer: {
          children: [],
        },
      },
    };
    const widgetMapping = new Map<string, string>([
      ['button_basic', 'app-schema-button'],
      ['button_primary', 'app-schema-button'],
      ['card', 'app-schema-card'],
      ['table', 'app-schema-table'],
      ['radio', 'app-schema-radio'],
      ['input', 'app-schema-input'],
    ]);
    resposne.predictions.forEach((data) => {
      tempSchema.layout.body?.children.push({
        class: 'widget',
        component: widgetMapping.get(data.class),
        props: {
          isBasic: data.class === 'button-basic',
        },
      });
    });
    let fileName = tempSchema.id
      ? tempSchema.id + '.json'
      : 'ai-schema-template.json';
    this.storeJSONData(tempSchema, fileName);
    return tempSchema.layout;
  }
}
