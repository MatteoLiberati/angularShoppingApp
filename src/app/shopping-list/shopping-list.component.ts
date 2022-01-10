import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Observable<{ingredients : Ingredient[]}>;
  subscription : Subscription;

  constructor(public shoppingListService: ShoppingListService,
            private store: Store<{ShoppingList : {ingredients : Ingredient[]}}>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select("ShoppingList")
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //     }
    //   )
  }

  ngOnDestroy() : void {
    // this.subscription.unsubscribe();
  }

  onEditItem(index : number){
    this.shoppingListService.startingEditing.next(index);
  }
}
