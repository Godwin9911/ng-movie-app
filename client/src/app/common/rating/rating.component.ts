import { Component, OnInit, Input } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rating',
  template: `
  <ngb-rating
  [(rate)]="rating" [readonly]="readonly">
  </ngb-rating>
  `,
  styles: ['* {color: #EDA800; font-size: 1.2rem;}'],
  providers: [NgbRatingConfig]
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  readonly = true;

  constructor(config: NgbRatingConfig) {
    config.max = 5;
  }

  ngOnInit() {
  }

}
