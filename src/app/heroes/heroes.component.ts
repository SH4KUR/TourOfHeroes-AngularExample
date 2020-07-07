import { Component, OnInit } from '@angular/core';
import { IHero } from "../hero";
import { HEROES } from "../mock-heroes";
import { HeroService } from "../hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: IHero[];
  selectedHero: IHero;

  constructor(private heroService: HeroService) { }

  onSelect(hero: IHero) {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
