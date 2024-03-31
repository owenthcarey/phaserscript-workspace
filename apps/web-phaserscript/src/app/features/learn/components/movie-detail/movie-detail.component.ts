import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'phaserscript-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {
  // @Input() videoUrl: string = '';
  // @Output() close = new EventEmitter<void>();
  //
  // closeModal(): void {
  //   this.close.emit();
  // }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { videoUrl: string },
    private dialogRef: MatDialogRef<MovieDetailComponent>
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
