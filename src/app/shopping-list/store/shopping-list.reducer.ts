import { Ingredient } from "../../shared/ingredient.model";
import { ADD_INGREDIENT } from "./shopping-list.action";

const initialState = {
  ingredients : [
    new Ingredient ("Apple", 5),
    new Ingredient ("Tomato", 10),
  ]
}

export function shoppingListReducer(state = initialState, action){
  switch(action.type){
    case ADD_INGREDIENT :
      return {
        ...state,
        ingredients : [...state.ingredients, action]
      }
  }
}
