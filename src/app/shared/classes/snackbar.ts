import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Snackbar {
  private readonly snackbar = inject(MatSnackBar);

  showSuccessSnackBar(message: string) {
    this.snackbar.open(message, 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snackbar-success',
      duration: 2000,
    });
  }

  showErrorSnackBar(message: string) {
    this.snackbar.open(message, 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snackbar-error',
    });
  }
}
