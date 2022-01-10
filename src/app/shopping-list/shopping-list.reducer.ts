import { Ingredient } from "../shared/ingredient.model";

const initialState = {
  ingredients : [
    new Ingredient ("Apple", 5),
    new Ingredient ("Tomato", 10),
  ]
}

export function shoppingListReducer(state = initialState, action){

}
