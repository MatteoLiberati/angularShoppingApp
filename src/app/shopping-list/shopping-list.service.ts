import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})

export class ShoppingListService{
    private ingredients : Ingredient[] = [
        new Ingredient ("Apple", 5),
        new Ingredient ("Tomato", 10),
    ];

    ingredientsChanged = new EventEmitter<Ingredient[]>();

    getIngredients(){
        return this.ingredients.slice();
    }

    ingredientAdded(newIngredient: Ingredient){
        this.ingredients.push(
          new Ingredient(newIngredient.name, newIngredient.amount)
        );
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredients){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice())
    }

}