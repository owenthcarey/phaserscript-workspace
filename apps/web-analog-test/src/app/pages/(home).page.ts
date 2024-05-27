import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'web-analog-test-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: ` <web-analog-test-analog-welcome /> `,
})
export default class HomePageComponent {
  constructor(private apiService: ApiService) {
    this.testRoutes();
  }

  testRoutes() {
    // Test RSS Feed Route
    this.apiService.getRSSFeed().subscribe({
      next: (response: string) => console.log(response),
      error: (error: any) => console.error('Error:', error),
      complete: () => console.log('Request complete')
    });

    // Test GET Route with Parameter
    this.apiService.getUserProfile('123').subscribe({
      next: (response: string) => console.log(response),
      error: (error: any) => console.error('Error:', error),
      complete: () => console.log('Request complete')
    });

    // Test POST Route
    const newUser = { name: 'Jane Doe', email: 'jane@example.com' };
    this.apiService.addUser(newUser).subscribe({
      next: (response: any) => console.log('Add User Response:', response),
      error: (error: any) => console.error('Error adding user:', error),
      complete: () => console.log('Add User Request complete')
    });

    // Test Query Parameters Route
    this.apiService.getQueryGreeting('Analog', 'Angular').subscribe({
      next: (response: string) => console.log(response),
      error: (error: any) => console.error('Error:', error),
      complete: () => console.log('Request complete')
    });

    // Test Catch-all Route
    this.apiService.getDefaultPage().subscribe({
      next: (response: string) => console.log(response),
      error: (error: any) => console.error('Error:', error),
      complete: () => console.log('Request complete')
    });

    // Test Error Handling Route
    this.apiService.getId('abc').subscribe({
      next: (response: string) => console.log(response),
      error: (error: any) => console.error('Error:', error),
      complete: () => console.log('Request complete')
    });

    this.apiService.getId('123').subscribe({
      next: (response: string) => console.log(response),
      error: (error: any) => console.error('Error:', error),
      complete: () => console.log('Request complete')
    });
  }
}
