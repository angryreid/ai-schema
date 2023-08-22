import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-schema-card',
  templateUrl: './schema-card.component.html',
  styleUrls: ['./schema-card.component.scss']
})
export class SchemaCardComponent implements OnInit {

  longText = `This is a best code helper tool which can help people who not familar with components build their pages quickly`;
  
  constructor() { }

  ngOnInit(): void {
  }

}
