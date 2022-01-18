import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as ShoppingListActions from "../shopping-list/store/shopping-list.action";
import * as fromApp from "../store/app.reducer";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit {
  ingredients : Observable<{ingredients : Ingredient[]}>;
  subscription : Subscription;

  constructor(public shoppingListService: ShoppingListService,
            private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList")
  }


  onEditItem(index : number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
}
