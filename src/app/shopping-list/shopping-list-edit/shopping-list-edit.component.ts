import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode: boolean = false;
  editingItemIndex : number;
  ingredientOnEdit : Ingredient;
  @ViewChild('f') form : NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(){
    this.subscription = this.shoppingListService.startingEditing.subscribe(
      (index : number) => {
        this.editMode = true;
        this.editingItemIndex = index;
        this.ingredientOnEdit = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.ingredientOnEdit.name,
          amount: this.ingredientOnEdit.amount,          
        })
      }
    )
  }

  onAddIngredients(form : NgForm){
    const value = form.value;
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editingItemIndex, new Ingredient(value.name, value.amount));
    }else{
      if(value.name != '' && !isNaN(value.amount) && value.amount != 0){
        this.shoppingListService.ingredientAdded(new Ingredient(value.name, value.amount))
      }
      else{
        alert("re-check your data. the name of your ingredient is required and the amount must be a number greateer than zero ")
      }
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
