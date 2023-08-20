import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import axios from 'axios';
import { ResponseData } from "./common.type";
import { SchemaData } from "../models/layout.modle";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) { }

    public YoloURL: string = 'http://127.0.0.1:5000/file_rec';
    public RoboFlowURL: string = 'https://detect.roboflow.com/angular-material-component-model/7';

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
            map(res => {
                console.log('Image uploaded successfully!');
                return res
            })
        )
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
        }
        const image = await loadImageBase64(file);
        return new Observable(observer => {
            axios({
                method: "POST",
                url: "https://detect.roboflow.com/angular-material-component-model/7",
                params: {
                    api_key: "ec7ZLY3vikxjIYZuPkim"
                },
                data: image,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
                console.log(response.data);
                observer.next(response.data);
                observer.complete();
            }).catch(function (error) {
                console.log(error.message);
            });
        })
    }

    public getSchemaJsonData(resposne: ResponseData, name: string) {
        const tempSchema: SchemaData = {
            id: "ai-schema-" + name,
            layout: {
                header: {
                    children: []
                },
                body: {
                    children: []
                },
                footer: {
                    children: []
                }
            }
        };
        const widgetMapping = new Map<string, string>([
            ['button-basic', 'app-schema-button'],
            ['button-primary', 'app-schema-button'],
            ['card', 'app-schema-card'],
            ['table', 'app-schema-table'],
            ['radio', 'app-schema-radio'],
            ['input', 'app-schema-input']
        ]);
        resposne.predictions.forEach(data => {
            tempSchema.layout.body?.children.push({
                class: '',
                component: widgetMapping.get(data.class),
                props: {
                    isBasic: data.class === 'button-basic'
                }
            });
        });
        return tempSchema;
    }

}
