import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export abstract class MovieBaseService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'YOUR_API_KEY_HERE';

  protected constructor(private http: HttpClient) { }

  getUpcomingMovies() {
    return this.http.get(`${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}&language=en-US`);
  }

  getMovieTrailers(movieId: string) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${this.apiKey}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        // Filter for YouTube trailers
        // @ts-ignore
        const trailers = response.results.filter(video => video.site === 'YouTube' && video.type === 'Trailer');
        // Map to full YouTube URLs
        // @ts-ignore
        return trailers.map(trailer => `https://www.youtube.com/watch?v=${trailer.key}`);
      })
    );
  }
}
