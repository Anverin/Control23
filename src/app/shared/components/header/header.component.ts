import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public searchInputValue: string | null;

  constructor(private activatedRoute: ActivatedRoute) {
    this.searchInputValue = '';
  }

  ngOnInit(): void {
   this.activatedRoute.queryParams.subscribe((params) => {
      if (params['search']) {
        this.searchInputValue = params['search'];
      }
    });
  }

  clearSearchInput() {
    this.searchInputValue = '';
  }

}
