import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent{

  constructor(private shoppingListService: ShoppingListService) { }

  onAddIngredients(form : NgForm){
    const value = form.value;
    if(value.name != '' && !isNaN(value.amount) && value.amount != 0){
      this.shoppingListService.ingredientAdded(new Ingredient(value.name, value.amount))
    }
    else{
      alert("re-check your data. the name of your ingredient is required and the amount must be a number greateer than zero ")
    }
  }
}
