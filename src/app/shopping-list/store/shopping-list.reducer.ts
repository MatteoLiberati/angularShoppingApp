import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.action";

const initialState = {
  ingredients : [
    new Ingredient ("Apple", 5),
    new Ingredient ("Tomato", 10),
  ]
}

export function shoppingListReducer(state = initialState, action : ShoppingListActions.ShoppingListActions){
  switch(action.type){

    case ShoppingListActions.ADD_INGREDIENT :
      return {
        ...state,
        ingredients : [...state.ingredients, action.payload]
      }

    case ShoppingListActions.ADD_INGREDIENTS :
      return {
        ...state,
        ingredients : [...state.ingredients, ...action.payload]
      }

    case ShoppingListActions.UPDATE_INGREDIENT:
      const oldingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...oldingredient,
        ...action.payload.ingredient,
      }
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredients : updatedIngredients
      }

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients : state.ingredients.filter((ig, index)=>{
          return index !== action.payload;
        })
      }
    default:
      return state;
  }
}
