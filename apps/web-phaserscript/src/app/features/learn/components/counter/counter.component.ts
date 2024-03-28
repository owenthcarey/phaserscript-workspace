import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../../../../core/store/actions/counter.action';
import { selectCounterCount } from '../../../../core/store/selectors/counter.selector';
import { AppState } from '../../../../core/store/state/app.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'phaserscript-counter',
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  count$: Observable<number>;

  constructor(private readonly store: Store<AppState>) {
    // ESLint: Using `string` or `props drilling` is forbidden. Use a selector
    // instead. (https://ngrx.io/guide/eslint-plugin/rules/prefer-selector-in-select)(@ngrx/prefer-selector-in-select)
    // this.count$ = store.select('count');
    this.count$ = store.select(selectCounterCount).pipe(takeUntilDestroyed());
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
