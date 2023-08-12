// create a metadata service
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// injectable decorator

// import static data from ai-schema-home.json
const HomeMeta = require('../schema/pages/ai-schema-home.json');
const AboutMeta = require('../schema/pages/ai-schema-about.json');

// create a map with json schema
// add about page to the map
const widgetTypeMap = new Map<string, any>([
  ['ai-schema-home', HomeMeta],
  ['ai-schema-about', AboutMeta],
]);
@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  getMetadata(pageName: string): Observable<any> {
    // return static data from ai-schema-home.json
    return of(widgetTypeMap.get(pageName)) || {}; // replace {} with your actual data
  }
}
