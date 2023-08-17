import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  value = 0;
  seconds: number = 0;
  public displayProgressBar = false;
  ngOnInit() {
    
  }

  public convert(){
    this.displayProgressBar = !this.displayProgressBar;
    const time = 60;
    const timer$ = interval(1000);

    const subscribe = timer$.subscribe(second => {
      this.value = (second * 300) / 30;
      this.seconds = second;

      if (this.seconds === 11) {
        subscribe.unsubscribe();
        this.displayProgressBar = !this.displayProgressBar;
      }
    });
  }
}
