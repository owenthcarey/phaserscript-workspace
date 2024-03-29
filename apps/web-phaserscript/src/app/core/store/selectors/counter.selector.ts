import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { CounterState } from '../state/counter.state';

// https://ngrx.io/guide/store/selectors#selecting-feature-states
// export const selectCounter = createFeatureSelector<CounterState>('counter');
export const selectCounter = (state: AppState) => state.counter;

export const selectCounterCount = createSelector(
  selectCounter,
  (state: CounterState) => state.count
);
