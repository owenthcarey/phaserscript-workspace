import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from '../actions/counter.action';
import { CounterState } from '../state/counter.state';

// Adjusting initialState to match the CounterState interface
export const initialState: CounterState = {
  count: 0, // initialState is now an object with a count property
};

// export const counterReducer = createReducer(
//   initialState,
//   on(increment, (state) => ({ ...state, count: state.count + 1 })),
//   on(decrement, (state) => ({ ...state, count: state.count - 1 })),
//   on(reset, (state) => ({ ...state, count: 0 }))
// );

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    console.log('Increment action dispatched', {currentState: state, newState: {...state, count: state.count + 1}});
    return {...state, count: state.count + 1};
  }),
  on(decrement, (state) => {
    console.log('Decrement action dispatched', {currentState: state, newState: {...state, count: state.count - 1}});
    return {...state, count: state.count - 1};
  }),
  on(reset, (state) => {
    console.log('Reset action dispatched', {currentState: state, newState: {...state, count: 0}});
    return {...state, count: 0};
  })
);
