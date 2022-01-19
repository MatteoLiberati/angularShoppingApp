import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';

import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
            private recipeService: RecipeService,
            private store : Store<fromApp.AppState>) {}

  storageData(){
    const recipes = this.recipeService.getRecipes();
    this.http.put("https://ng-liberati-shopping-app-default-rtdb.firebaseio.com/recipes.json", recipes).subscribe()
  }

  fetchRecipes(){
      return this.http.get<Recipe[]>("https://ng-liberati-shopping-app-default-rtdb.firebaseio.com/recipes.json").pipe(
      map(recipes=>{
        return recipes.map(
          recipe =>{
            return {
              ...recipe,
              ingredients : recipe.ingredients ? recipe.ingredients : [],
            }
          }
        )
      }),
      tap(
        recipes=>{
          this.store.dispatch(new RecipeActions.SetRecipes(recipes));
          // this.recipeService.setRecipe(recipes);
        }
      )
    )
  }
}
