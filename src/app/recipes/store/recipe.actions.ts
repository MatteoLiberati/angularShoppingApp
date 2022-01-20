import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = "[recipes] Set Recipes";
export const FETCH_RECIPES = "[recipes] Fetch Recipes";

export class SetRecipes implements Action{
  readonly type = SET_RECIPES;

  constructor(public payload : Recipe[]){}
}

export class FetchRecipes implements Action{
  readonly type = FETCH_RECIPES;
}

export type RecipesActions = SetRecipes | FetchRecipes;
