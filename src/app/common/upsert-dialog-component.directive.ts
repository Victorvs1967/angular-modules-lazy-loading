import { Directive, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpsertDialogData } from './upsert-dialog-data';

@Directive()
export abstract class UpsertDialogComponent<Entity extends Record<string, any>> implements OnInit {

  ref: MatDialogRef<Entity, string> = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  abstract get form(): FormGroup;
  abstract getMessages(): Record<UpsertDialogData<Entity>['action'], string>;

  get action() {
    return this.data.action;
  }

  constructor() { }

  ngOnInit(): void {
    if (this.data.action === 'edit') {
      this.form.patchValue(this.data.currentValue);
    }
  }

  upsert() {
    if (this.form.invalid) return;
    this.data.actions$[this.action](this.form.getRawValue()).subscribe(() => this.ref.close());
  }

}
