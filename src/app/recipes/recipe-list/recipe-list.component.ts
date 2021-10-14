import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes : Recipe[] = [
    new Recipe("Roast Chicken", "with Chile-Basil Vinaigrette, Broccoli, and Potatoes", "https://cdn.pixabay.com/photo/2015/03/26/09/39/fried-chicken-690039_960_720.jpg"),
    new Recipe("Asparagus", "Asparagus With Lemon-Pepper Marinade From Bryant Terry", "https://cdn.pixabay.com/photo/2016/04/04/17/22/meal-1307604_960_720.jpg"),
    new Recipe("Beans", "Better Baked Beans", "https://cdn.pixabay.com/photo/2018/09/25/20/09/bush-beans-3702999_960_720.jpg"),
  ];

  constructor() {
   }

  ngOnInit(): void {
  }

}
