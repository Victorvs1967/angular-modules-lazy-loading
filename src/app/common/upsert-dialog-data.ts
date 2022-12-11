import { Observable } from "rxjs";

export interface UpsertDialogData<T> {
  action: 'add' | 'edit';
  actions$: Record<
    UpsertDialogData<T>['action'],
    (value: T) => Observable<any>
  >;
  currentValue: T | undefined;
}
