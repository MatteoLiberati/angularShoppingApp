import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})

export class RecipeResolver implements Resolve<Recipe[]> {

  constructor(private dataStorageService : DataStorageService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.dataStorageService.fetchRecipes();
  }
}
