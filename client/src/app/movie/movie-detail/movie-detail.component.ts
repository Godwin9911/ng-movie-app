import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  errorMessage: string;
  loading = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = !this.loading;
    const resolvedData = this.route.snapshot.data['moviedetail'];
    if (resolvedData.error) {
      this.loading = !this.loading;
      return this.errorMessage = `Error retrieving movie Details`;
    }
    this.loading = !this.loading;
    return this.movie = resolvedData;
  }
}
