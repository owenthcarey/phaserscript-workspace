import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'web-analog-test-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: ` <web-analog-test-analog-welcome /> `,
})
export default class HomeComponent {}
