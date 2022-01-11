import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.action";

export interface State {
  ingredients : Ingredient[];
  editedIngredient : Ingredient;
  editedIngredientIndex : number;
}

export interface AppState {
  ShoppingList : State
}

const initialState : State = {
  ingredients : [
    new Ingredient ("Apple", 5),
    new Ingredient ("Tomato", 10),
  ],
  editedIngredient : null,
  editedIngredientIndex : -1,
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
    case ShoppingListActions.START_EDIT:
      return{
        ...state,
        editedIngredientIndex : action.payload,
        editedIngredient : {...state.ingredients[action.payload]},
      }
    case ShoppingListActions.STOP_EDIT:
      return{
        ...state,
        editedIngredientIndex : -1,
        editedIngredient : null,
      }
    default:
      return state;
  }
}
