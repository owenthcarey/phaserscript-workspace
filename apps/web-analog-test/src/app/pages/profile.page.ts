import { Component } from '@angular/core';

import { BaseComponent } from '@phaserscript/xplat/core';

@Component({
  selector: 'web-analog-test-profile',
  standalone: true,
  // template: ` <h2>Welcome</h2> `,
  template: `
    <div class="border border-gray-300 bg-gray-200 h-48">Top Div Content</div>
    <div class="border border-gray-300">
      <div class="grid grid-cols-3">
        <div class="bg-red-300 h-48">1</div>
        <div class="bg-blue-300 h-48">2</div>
        <div class="bg-green-300 h-48">3</div>
        <div class="bg-yellow-300 h-48">4</div>
        <div class="bg-purple-300 h-48">5</div>
        <div class="bg-indigo-300 h-48">6</div>
      </div>
    </div>
  `
})
export default class ProfilePageComponent extends BaseComponent {}
