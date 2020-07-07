import { MessageService } from './message.service';

import { IHero } from "./hero";
import { HEROES } from "./mock-heroes";

import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<IHero[]> {
    this.messageService.add('HeroService: Fetched Heroes');
    return of(HEROES);
  }
}