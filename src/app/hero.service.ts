import { MessageService } from './message.service';

import { IHero } from "./hero";
import { HEROES } from "./mock-heroes";

import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';   // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHero(id: number): Observable<IHero> {
    const url = `${ this.heroesUrl }/${ id }`;
    return this.http.get<IHero>(url)
      .pipe(
        tap(_ => this.log(`Fetched Hero, ID: ${ id }`)),
        catchError(this.handleError<IHero>(`getHero id=${ id }`))
      );
  }

  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('Fetched Heroes')),
        catchError(this.handleError<IHero[]>('getHeroes', []))
      );
  }

  updateHero(hero: IHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Update Hero, ID: ${ hero.id }`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }  

  private log(message: string) {
    this.messageService.add(`HeroService: ${ message }`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${ operation } failed: ${ error.message }`);
      return of(result as T);
    };
  }
}
