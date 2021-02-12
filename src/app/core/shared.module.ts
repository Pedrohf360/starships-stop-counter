import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarWarsService } from './star-wars.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatTableModule, MatPaginatorModule, ReactiveFormsModule, MatIconModule,
    FlexLayoutModule
  ],
  exports: [
    MatSnackBarModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatTableModule, MatPaginatorModule, ReactiveFormsModule, MatIconModule,
    FlexLayoutModule
  ],
  providers: [StarWarsService]
})
export class SharedModule { }
