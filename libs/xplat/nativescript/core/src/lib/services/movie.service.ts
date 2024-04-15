import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieBaseService } from '@phaserscript/xplat/core';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends MovieBaseService {
  constructor(http: HttpClient) {
    super(http);
  }
}
