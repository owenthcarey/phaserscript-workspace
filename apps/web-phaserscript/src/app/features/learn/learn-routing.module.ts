import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CounterComponent,
  LearnComponent,
  MoviesComponent,
  QuantumComputingComponent
} from './components';

const routes: Routes = [
  {
    path: '',
    component: LearnComponent,
  },
  {
    path: 'counter',
    component: CounterComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'quantum-computing',
    component: QuantumComputingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnRoutingModule {}
