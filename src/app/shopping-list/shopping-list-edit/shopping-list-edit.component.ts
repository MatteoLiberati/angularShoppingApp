import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.action';
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

  constructor(private shoppingListService: ShoppingListService,
            private store: Store<{shoppingList : {ingredients: Ingredient[]}}>) { }

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

  onSubmit(form : NgForm){
    const value = form.value;
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editingItemIndex, new Ingredient(value.name, value.amount));
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredient(value.name, value.amount)))
      // this.shoppingListService.ingredientAdded(new Ingredient(value.name, value.amount))
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.form.reset();
    this.editMode =  false;
  }

  onDelete(){
    this.shoppingListService.removeIngredient(this.editingItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
