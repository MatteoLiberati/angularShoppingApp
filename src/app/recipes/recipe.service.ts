import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable(
  {providedIn: "root"}
)

export class RecipeService{

  recipeChanged : Subject<Recipe[]> = new Subject<Recipe[]>();

  private recipes : Recipe[] = [
      new Recipe("Roast Chicken",
                  "with Chile-Basil Vinaigrette, Broccoli, and Potatoes",
                  "https://cdn.pixabay.com/photo/2015/03/26/09/39/fried-chicken-690039_960_720.jpg",
                  [new Ingredient('chicken', 1),
                  new Ingredient('broccoli',5)]),
      new Recipe("Asparagus",
                  "Asparagus With Lemon-Pepper Marinade From Bryant Terry", 
                  "https://cdn.pixabay.com/photo/2016/04/04/17/22/meal-1307604_960_720.jpg",
                  [new Ingredient("Asparagus",10),
                  new Ingredient("lemon",1)]),
      new Recipe("Beans", 
                  "Better Baked Beans", 
                  "https://cdn.pixabay.com/photo/2018/09/25/20/09/bush-beans-3702999_960_720.jpg",
                  [new Ingredient("Beans",5)]),
      new Recipe("Roast Chicken", 
                  "with Chile-Basil Vinaigrette, Broccoli, and Potatoes",
                  "https://cdn.pixabay.com/photo/2015/03/26/09/39/fried-chicken-690039_960_720.jpg",
                  [new Ingredient("Roast Chicken",1),
                  new Ingredient("broccoli",5),
                  new Ingredient("potatoes",8)]),
      new Recipe("Asparagus", 
              "Asparagus With Lemon-Pepper Marinade From Bryant Terry", 
              "https://cdn.pixabay.com/photo/2016/04/04/17/22/meal-1307604_960_720.jpg",
              [new Ingredient("Asparagus",7),
              new Ingredient("Lemon",1)]),
      new Recipe("Beans", 
              "Better Baked Beans", 
              "https://cdn.pixabay.com/photo/2018/09/25/20/09/bush-beans-3702999_960_720.jpg",
              [new Ingredient("Beans",5)]),
    ];

    constructor(private shoppingListService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }
    
    addNewIngredientsInList(ingredients){
      this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(id){
      return this.recipes[id];
    }

    addRecipe(recipe : Recipe){
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index : number, recipe: Recipe){
      this.recipes[index] = recipe;
      this.recipeChanged.next(this.recipes.slice());
    }
}