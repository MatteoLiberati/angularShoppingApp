import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.action"
import * as fromShoppingList from "../../shopping-list/store/shopping-list.reducer";
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
    private store : Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params)=>{
        this.id = params['id'];
        this.recipeDetail = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onAddToListIngredients(){
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipeDetail.ingredients))
    // this.recipeService.addNewIngredientsInList(this.recipeDetail.ingredients);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
