import { Component } from '@angular/core';

import { BaseComponent } from '@phaserscript/xplat/core';

@Component({
  selector: 'phaserscript-learn',
  templateUrl: 'learn.component.html',
  styleUrls: ['learn.component.scss'],
})
export class LearnComponent extends BaseComponent {
  games = [
    {
      title: 'Quantum Computing',
      subtitle: 'TODO',
      img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      description: 'TODO',
      route: '/learn/quantum-computing',
    },
  ];

  constructor() {
    super();
  }
}
