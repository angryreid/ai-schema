import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-schema-button',
  templateUrl: './schema-button.component.html',
  styleUrls: ['./schema-button.component.scss']
})
export class SchemaButtonComponent implements OnInit {
  @Input() isBasic = true;
  @Input() buttonText: string = 'button';
  constructor() { }

  ngOnInit(): void {
  }

}
