import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieService } from '@phaserscript/xplat/web/core';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'phaserscript-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.movieService.getUpcomingMovies().subscribe((response: any) => {
      this.movies = response.results;
    });
  }

  onMovieClick(movieId: string) {
    this.movieService.getMovieTrailers(movieId).subscribe(trailers => {
      console.log(`${movieId} trailer:`, trailers);
      if (trailers.length > 0) {
        // Assuming trailers[0] is like "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        const embedUrl = this.convertToEmbedUrl(trailers[0]); // Using the first trailer URL
        if (embedUrl) {
          this.dialog.open(MovieDetailComponent, {
            width: '80%',
            data: { videoUrl: embedUrl } // Converted YouTube embed URL
          });
        }
      }
    });
  }

  convertToEmbedUrl(url: string): string | null {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }
}
