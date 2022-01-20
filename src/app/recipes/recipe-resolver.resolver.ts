import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RecipeResolver implements Resolve<Recipe[]> {

  constructor(private dataStorageService : DataStorageService,
              private recipeService : RecipeService,
              private store : Store<fromApp.AppState>,
              private actions$ : Actions){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    // const recipes = this.recipeService.getRecipes();
    // if(recipes.length === 0){
    //   return this.dataStorageService.fetchRecipes();
    // }
    this.store.dispatch(new RecipeActions.FetchRecipes());

    return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
;  }
}
