import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail : Recipe;
  
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data : Data) => {
        this.recipeDetail = data['recipeDetail'];
        }
      )
  }
  
  onAddToListIngredients(){
    this.recipeService.addNewIngredientsInList(this.recipeDetail.ingredients);
  }
}
