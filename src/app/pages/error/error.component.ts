import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.router.navigate(["/login"])
    // }, 5000);
  }

}
