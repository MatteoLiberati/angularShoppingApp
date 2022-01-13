import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.action";
import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable(
  {providedIn: "root"}
)

export class RecipeService{

  recipeChanged : Subject<Recipe[]> = new Subject<Recipe[]>();

  recipes: Recipe[] = [];
  // private recipes : Recipe[] = [
  //     new Recipe("Roast Chicken",
  //                 "with Chile-Basil Vinaigrette, Broccoli, and Potatoes",
  //                 "https://cdn.pixabay.com/photo/2015/03/26/09/39/fried-chicken-690039_960_720.jpg",
  //                 [new Ingredient('chicken', 1),
  //                 new Ingredient('broccoli',5)]),
  //     new Recipe("Asparagus",
  //                 "Asparagus With Lemon-Pepper Marinade From Bryant Terry",
  //                 "https://cdn.pixabay.com/photo/2016/04/04/17/22/meal-1307604_960_720.jpg",
  //                 [new Ingredient("Asparagus",10),
  //                 new Ingredient("lemon",1)]),
  //     new Recipe("Beans",
  //                 "Better Baked Beans",
  //                 "https://cdn.pixabay.com/photo/2018/09/25/20/09/bush-beans-3702999_960_720.jpg",
  //                 [new Ingredient("Beans",5)]),
  //     new Recipe("Roast Chicken",
  //                 "with Chile-Basil Vinaigrette, Broccoli, and Potatoes",
  //                 "https://cdn.pixabay.com/photo/2015/03/26/09/39/fried-chicken-690039_960_720.jpg",
  //                 [new Ingredient("Roast Chicken",1),
  //                 new Ingredient("broccoli",5),
  //                 new Ingredient("potatoes",8)]),
  //     new Recipe("Asparagus",
  //             "Asparagus With Lemon-Pepper Marinade From Bryant Terry",
  //             "https://cdn.pixabay.com/photo/2016/04/04/17/22/meal-1307604_960_720.jpg",
  //             [new Ingredient("Asparagus",7),
  //             new Ingredient("Lemon",1)]),
  //     new Recipe("Beans",
  //             "Better Baked Beans",
  //             "https://cdn.pixabay.com/photo/2018/09/25/20/09/bush-beans-3702999_960_720.jpg",
  //             [new Ingredient("Beans",5)]),
  //   ];

    constructor(private shoppingListService: ShoppingListService,
                private store : Store<fromShoppingList.AppState>){}

    setRecipe(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    addNewIngredientsInList(ingredients){
      // this.shoppingListService.addIngredients(ingredients);
      this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    getRecipe(id){
      return this.recipes[id];
    }

    addRecipe(recipe : Recipe){
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
      this.recipes.splice(index,1);
      this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index : number, recipe: Recipe){
      this.recipes[index] = recipe;
      this.recipeChanged.next(this.recipes.slice());
    }
}
