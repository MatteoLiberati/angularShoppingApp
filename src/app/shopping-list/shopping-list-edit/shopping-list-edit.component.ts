import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromApp from "../../store/app.reducer";
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode: boolean = false;
  ingredientOnEdit : Ingredient;
  @ViewChild('f') form : NgForm;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(){
    this.subscription = this.store.select('shoppingList').subscribe(stateData =>{
      if (stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.ingredientOnEdit = stateData.editedIngredient;
        this.form.setValue({
          name: this.ingredientOnEdit.name,
          amount: this.ingredientOnEdit.amount,
        })
      }else{
        this.editMode = false
      }
    })
  }

  onSubmit(form : NgForm){
    const value = form.value;
    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(new Ingredient(value.name, value.amount) ))
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredient(value.name, value.amount)))
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
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
