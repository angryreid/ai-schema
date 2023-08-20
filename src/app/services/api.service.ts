import { Injectable } from "@angular/core";
import axios from "axios";
import { SchemaData } from "../models/layout.modle";

export interface ResponseData {
    predictions: Rredictions[];
}

export interface Rredictions {
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
    class: string;
}

@Injectable({
    providedIn: 'root',
})

export class ApiService {
    public getSchemaResponse(file: any) {
        const loadImageBase64 = (file: any) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        }
        const image = loadImageBase64(file);
        axios({
            method: "POST",
            url: "https://detect.roboflow.com/angular-material-component-model/7",
            params: {
                api_key: "roboflow"
            },
            data: image,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error.message);
        });
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