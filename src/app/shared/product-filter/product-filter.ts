import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.html',
  styleUrls: ['./product-filter.scss'],
  imports: [
        FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class ProductFilter {

  filters = {
    search: '',
    categories: {
      electronique: false,
      mode: false,
      maison: false
    },
    maxPrice: 1000,
    condition: 'all'
  };

  resetFilters() {
    this.filters = {
      search: '',
      categories: {
        electronique: false,
        mode: false,
        maison: false
      },
      maxPrice: 1000,
      condition: 'all'
    };
  }

}
