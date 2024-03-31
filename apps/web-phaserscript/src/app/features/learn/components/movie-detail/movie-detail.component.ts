import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'phaserscript-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {
  // @Input() show = false;
  @Input() videoUrl: string = '';
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    // this.show = false;
    this.close.emit();
  }
}
