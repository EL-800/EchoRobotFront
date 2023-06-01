import { Component, OnInit } from '@angular/core';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  faEnvelope = faEnvelope;
  faLock = faLock;

  Email : string = "";
  Password:string = "";

  constructor() { }

  ngOnInit(): void {
  }

  
}
