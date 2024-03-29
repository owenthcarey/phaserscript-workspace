import { HttpClient } from '@angular/common/http';

export abstract class MovieBaseService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'YOUR_API_KEY_HERE';

  protected constructor(private http: HttpClient) { }

  getUpcomingMovies() {
    return this.http.get(`${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}&language=en-US`);
  }
}
