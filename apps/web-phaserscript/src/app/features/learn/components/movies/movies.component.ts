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
  isModalOpen = false;
  selectedTrailerUrl = '';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getUpcomingMovies().subscribe((response: any) => {
      this.movies = response.results;
      // Here you might need to loop through movies to fetch additional details like trailers
      // for (const movie of this.movies) {
      //   console.log(`${movie.title} trailer:`, this.movieService.getMovieTrailers(movie.id));
      // }
      // for (const movie of this.movies) {
      //   this.movieService.getMovieTrailers(movie.id).subscribe(trailers => {
      //     console.log(`${movie.title} trailer:`, trailers);
      //   });
      // }
    });
  }

  onMovieClick(movieId: string) {
    // Handle the click event. For example, navigate to a detail page or open a modal to show the trailer.
    // You can use Angular Router here if you want to navigate to a detail component
    this.movieService.getMovieTrailers(movieId).subscribe(trailers => {
      console.log(`${movieId} trailer:`, trailers);
      // if (trailers.length > 0) {
      //   this.selectedTrailerUrl = trailers[0]; // Using the first trailer URL
      //   this.isModalOpen = true;
      // }
      if (trailers.length > 0) {
        // Assuming trailers[0] is like "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        const embedUrl = this.convertToEmbedUrl(trailers[0]); // Using the first trailer URL
        if (embedUrl) {
          this.selectedTrailerUrl = embedUrl; // Converted YouTube embed URL
          this.isModalOpen = true;
        }
      }
    });
  }

  convertToEmbedUrl(url: string): string | null {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
