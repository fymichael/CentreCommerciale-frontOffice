import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search';

@Component({
  selector: 'app-header',
  imports: [MatIcon, RouterLink, RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private searchService: SearchService) {}

  onSearch(term: string) {
    this.searchService.triggerSearch(term);
  }

}
