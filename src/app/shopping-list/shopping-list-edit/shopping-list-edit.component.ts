import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';
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
            private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(){
    this.subscription = this.store.select('ShoppingList').subscribe(stateData =>{
      if (stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editingItemIndex = stateData.editedIngredientIndex;
        this.ingredientOnEdit = stateData.editedIngredient;
        this.form.setValue({
          name: this.ingredientOnEdit.name,
          amount: this.ingredientOnEdit.amount,
        })
      }else{
        this.editMode = false
      }
    })

    // this.subscription = this.shoppingListService.startingEditing.subscribe(
    //   (index : number) => {
    //     this.editMode = true;
    //     this.editingItemIndex = index;
    //     this.ingredientOnEdit = this.shoppingListService.getIngredient(index);
    //     this.form.setValue({
    //       name: this.ingredientOnEdit.name,
    //       amount: this.ingredientOnEdit.amount,
    //     })
    //   }
    // )
  }

  onSubmit(form : NgForm){
    const value = form.value;
    if(this.editMode){
      // this.shoppingListService.updateIngredient(this.editingItemIndex, new Ingredient(value.name, value.amount));
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index:this.editingItemIndex , ingredient : new Ingredient(value.name, value.amount) }))
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
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editingItemIndex))
    // this.shoppingListService.removeIngredient(this.editingItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
