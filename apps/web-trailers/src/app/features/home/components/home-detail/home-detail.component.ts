import { Component, Inject } from '@angular/core';

import { BaseComponent } from '@phaserscript/xplat/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'phaserscript-home-detail',
  templateUrl: 'home-detail.component.html'
})
export class HomeDetailComponent extends BaseComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { videoUrl: string },
    private dialogRef: MatDialogRef<HomeDetailComponent>
  ) {
    super();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
