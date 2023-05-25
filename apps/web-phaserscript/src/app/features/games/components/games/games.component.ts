import { Component } from '@angular/core';

import { BaseComponent } from '@phaserscript-workspace/xplat/core';

@Component({
  selector: 'phaserscript-workspace-games',
  templateUrl: 'games.component.html',
  styleUrls: ['games.component.scss'],
})
export class GamesComponent extends BaseComponent {
  games = [
    {
      title: 'Pinball',
      subtitle: 'Arcade Game',
      img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      description:
        'A fun, fast-paced pinball game. Test your skills and beat your high score!',
      route: '/games/pinball',
    },
    // Add more game objects here later...
  ];

  constructor() {
    super();
  }
}
