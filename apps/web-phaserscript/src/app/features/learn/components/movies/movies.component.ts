import { Component, OnInit } from '@angular/core';
import { MovieService } from '@phaserscript/xplat/web/core';

@Component({
  selector: 'phaserscript-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  items = Array.from({length: 100}, (_, i) => `Item ${i + 1}`);
  movies: any[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getUpcomingMovies().subscribe((response: any) => {
      this.movies = response.results;
      // Here you might need to loop through movies to fetch additional details like trailers
    });
  }
}
