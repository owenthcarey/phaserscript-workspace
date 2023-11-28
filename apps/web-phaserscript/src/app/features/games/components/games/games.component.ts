import { Component } from '@angular/core';

import { BaseComponent } from '@phaserscript/xplat/core';

@Component({
  selector: 'phaserscript-games',
  templateUrl: 'games.component.html',
  styleUrls: ['games.component.scss'],
})
export class GamesComponent extends BaseComponent {
  games = [
    {
      title: 'Example',
      subtitle: 'Arcade Game',
      img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      description: 'TODO!',
      route: '/games/example',
    },
    {
      title: 'Pinball',
      subtitle: 'Arcade Game',
      img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      description:
        'A fun, fast-paced pinball game. Test your skills and beat your high score!',
      route: '/games/pinball',
    },
    // {
    //   title: 'Doodle Jump',
    //   subtitle: 'Platformer',
    //   img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    //   description: 'Jump as high as you can in this exciting platformer game!',
    //   route: '/games/doodle-jump',
    // },
    // {
    //   title: 'Space Shooter',
    //   subtitle: 'Arcade Game',
    //   img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    //   description:
    //     'Defend the galaxy against waves of enemy spaceships in this action-packed shooter!',
    //   route: '/games/space-shooter',
    // },
  ];

  constructor() {
    super();
  }
}
