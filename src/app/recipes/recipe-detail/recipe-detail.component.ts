import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import * as ShoppingListActions from "../../shopping-list/store/shopping-list.action"
import * as fromApp from "../../store/app.reducer"
import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail : Recipe;
  id : number;

  constructor(
    private router : Router,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private store : Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.route.params.subscribe(
    //   (params : Params)=>{
    //     this.id = params['id'];
    //     this.recipeDetail = this.recipeService.getRecipe(this.id);
    //   }
    // )

    this.route.params.pipe(map(params=>{
      return +params["id"]
    }),
    switchMap(id => {
      this.id = id;
      return this.store.select("recipes");
    }),
    map(recipesState=>{
      return recipesState.recipes.find((recipe,index)=>{
        return index === this.id
      })
    })
    )
    .subscribe(recipe=>{
      this.recipeDetail = recipe;
    })
  }

  onAddToListIngredients(){
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipeDetail.ingredients))
  }

  onDeleteRecipe(){
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
