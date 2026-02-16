import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [MatIcon, RouterLink, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
