import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnComponent, QuantumComputingComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: LearnComponent,
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
