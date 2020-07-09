import { Component, OnInit } from '@angular/core';

import { HeroService } from './../hero.service';
import { IHero } from '../hero';

import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<IHero[]>;
  private searchItems = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchItems.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchItems.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}
