import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.action";

const initialState = {
  ingredients : [
    new Ingredient ("Apple", 5),
    new Ingredient ("Tomato", 10),
  ]
}

export function shoppingListReducer(state = initialState, action : ShoppingListActions.AddIngredient){
  switch(action.type){
    case ShoppingListActions.ADD_INGREDIENT :
      return {
        ...state,
        ingredients : [...state.ingredients, action.payload]
      }
    default:
      return state;
  }
}
