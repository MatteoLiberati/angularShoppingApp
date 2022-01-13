import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})

export class ShoppingListService{
    // private ingredients : Ingredient[] = [
    //     new Ingredient ("Apple", 5),
    //     new Ingredient ("Tomato", 10),
    // ];

    // ingredientsChanged = new Subject<Ingredient[]>();
    // startingEditing = new Subject<number>();

    // getIngredients(){
    //     return this.ingredients.slice();
    // }

    // getIngredient(index: number): Ingredient {
    //     return this.ingredients[index];
    // }

    // ingredientAdded(newIngredient: Ingredient){
    //     this.ingredients.push(
    //       new Ingredient(newIngredient.name, newIngredient.amount)
    //     );
    //     this.ingredientsChanged.next(this.ingredients.slice());
    // }

    // addIngredients(ingredients){
    //     this.ingredients.push(...ingredients);
    //     this.ingredientsChanged.next(this.ingredients.slice())
    // }

    // updateIngredient(index: number , newIngredient: Ingredient){
    //     this.ingredients[index] = newIngredient;
    //     this.ingredientsChanged.next(this.ingredients.slice());
    // }

    // removeIngredient(index:number){
    //     this.ingredients.splice(index, 1);
    //     this.ingredientsChanged.next(this.ingredients.slice());
    // }

}
