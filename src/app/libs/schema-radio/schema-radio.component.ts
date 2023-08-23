import { Component, OnInit } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-schema-radio',
  templateUrl: './schema-radio.component.html',
  styleUrls: ['./schema-radio.component.scss']
})
export class SchemaRadioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  contacts: string[] = ['Manager', 'Team members', 'Email', 'Social Media'];
}
