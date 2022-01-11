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
      const oldingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...oldingredient,
        ...action.payload,
      }
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients : updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient : null,
      }

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients : state.ingredients.filter((ig, index)=>{
          return index !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient : null,
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
