import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ai-schema';
  name = 'hello-world-/assets/img/ai-schema.png';
  name2 = 'hello-world-2-/assets/img/ai-schema.png';
  name3 = 'hello-world-3-/assets/img/ai-schema.png';
  name4  = 'hello-world-4-/assets/img/ai-schema.png';
  name5 = 'hello-world-5-/preauth/assets/img/ai-schema.png';
  constructor(private router:Router) { }
  ngOnInit() {
    this.router.navigate(['dashboard']);
    // this.router.navigate(['home']);
  }
}
