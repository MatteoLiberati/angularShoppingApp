import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @Output() newIngredient = new EventEmitter<Ingredient>();

  @ViewChild('nameInput',{static: false}) nameInput : ElementRef; 
  @ViewChild('amountInput', {static: false}) amountInput : ElementRef; 

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredients(){
    const name = this.nameInput.nativeElement.value.trim();
    const amount = parseInt(this.amountInput.nativeElement.value.trim());
    if(name != '' && !isNaN(amount) && amount != 0){
      this.newIngredient.emit(new Ingredient(name,amount))
    }
    else{
      alert("re-check your data. the name of your ingredient is required and the amount must be a number greateer than zero ")
    }
  }
}
