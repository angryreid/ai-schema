import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  date: string;
  transactionAmount: string;
  description: string;
  transactionReferenceId: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: '2023.08.20', transactionAmount: 'USD 20.00', description: 'uimasterdesc 333', transactionReferenceId: 'uimasterid003'},
  {date: '2023.08.18', transactionAmount: 'HKD 18.00', description: 'uimasterdesc 222', transactionReferenceId: 'uimasterid002'},
  {date: '2023.08.18', transactionAmount: 'HKD 12.00', description: 'uimasterdesc 111', transactionReferenceId: 'uimasterid001'}
];

@Component({
  selector: 'app-schema-table',
  templateUrl: './schema-table.component.html',
  styleUrls: ['./schema-table.component.scss']
})
export class SchemaTableComponent implements OnInit {

  // dataSource = new MatTableModule();
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }
  
}
