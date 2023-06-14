import { Component, OnInit } from '@angular/core';
import { faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  faComment = faComment;

  constructor() { }

  ngOnInit(): void {
  }

}
