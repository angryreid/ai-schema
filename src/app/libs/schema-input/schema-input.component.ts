import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-schema-input',
  templateUrl: './schema-input.component.html',
  styleUrls: ['./schema-input.component.scss']
})
export class SchemaInputComponent implements OnInit {
  @Input() label1: string = 'User Name';
  @Input() label2: string = 'Password';

  constructor() { }

  ngOnInit(): void {
  }

}
