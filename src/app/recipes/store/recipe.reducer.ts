import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
    recipes : [
    //   new Recipe("Roast Chicken",
    //               "with Chile-Basil Vinaigrette, Broccoli, and Potatoes",
    //               "https://cdn.pixabay.com/photo/2015/03/26/09/39/fried-chicken-690039_960_720.jpg",
    //               [new Ingredient('chicken', 1),
    //               new Ingredient('broccoli',5)]),
    //   new Recipe("Asparagus",
    //               "Asparagus With Lemon-Pepper Marinade From Bryant Terry",
    //               "https://cdn.pixabay.com/photo/2016/04/04/17/22/meal-1307604_960_720.jpg",
    //               [new Ingredient("Asparagus",10),
    //               new Ingredient("lemon",1)]),
    //   new Recipe("Beans",
    //               "Better Baked Beans",
    //               "https://cdn.pixabay.com/photo/2018/09/25/20/09/bush-beans-3702999_960_720.jpg",
    //               [new Ingredient("Beans",5)]),
    //   new Recipe("Roast Chicken",
    //               "with Chile-Basil Vinaigrette, Broccoli, and Potatoes",
    //               "https://cdn.pixabay.com/photo/2015/03/26/09/39/fried-chicken-690039_960_720.jpg",
    //               [new Ingredient("Roast Chicken",1),
    //               new Ingredient("broccoli",5),
    //               new Ingredient("potatoes",8)]),
    //   new Recipe("Asparagus",
    //           "Asparagus With Lemon-Pepper Marinade From Bryant Terry",
    //           "https://cdn.pixabay.com/photo/2016/04/04/17/22/meal-1307604_960_720.jpg",
    //           [new Ingredient("Asparagus",7),
    //           new Ingredient("Lemon",1)]),
    //   new Recipe("Beans",
    //           "Better Baked Beans",
    //           "https://cdn.pixabay.com/photo/2018/09/25/20/09/bush-beans-3702999_960_720.jpg",
    //           [new Ingredient("Beans",5)]),
    ]
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case RecipesActions.ADD_RECIPE:
      return{
        ...state,
        recipes : [...state.recipes, action.payload]
      }
    case RecipesActions.DELETE_RECIPE:
      return{
        ...state,
        recipes : state.recipes.filter((recipe, index)=>{
          return index !== action.payload;
        })
      }
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.recipe,
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return{
        ...state,
        recipes : updatedRecipes,
      }
      default:
        return state;
    }
}
