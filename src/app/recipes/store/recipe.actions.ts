import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = "[recipes] Set Recipes";
export const FETCH_RECIPES = "[recipes] Fetch Recipes";
export const DELETE_RECIPE = "[recipes] Delete Recipe";
export const UPDATE_RECIPE = "[recipes] Update Recipe";
export const ADD_RECIPE = "[recipes] Add Recipe";
export const SAVE_RECIPES = "[recipes] Save Recipe";

export class SetRecipes implements Action{
  readonly type = SET_RECIPES;

  constructor(public payload : Recipe[]){}
}

export class FetchRecipes implements Action{
  readonly type = FETCH_RECIPES;
}

export class DeleteRecipe implements Action{
  readonly type = DELETE_RECIPE;

  constructor(public payload : number){}
}

export class AddRecipe implements Action{
  readonly type = ADD_RECIPE;

  constructor(public payload : Recipe){}
}

export class UpdateRecipe implements Action{
  readonly type = UPDATE_RECIPE;

  constructor(public payload : {index:number, recipe:Recipe}){};
}

export class SaveRecipes implements Action{
  readonly type = SAVE_RECIPES;
}

export type RecipesActions = SetRecipes | FetchRecipes | DeleteRecipe | AddRecipe | UpdateRecipe | SaveRecipes;
