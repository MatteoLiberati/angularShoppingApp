import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail : Recipe;
  id : number;
  
  constructor(
    private router : Router,
    private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data : Data) => {
        this.recipeDetail = data['recipeDetail'];
        }
      )
    this.route.params.subscribe(
      (params : Params)=>{
        this.id = params['id'];
      }
    )
  }
  
  onAddToListIngredients(){
    this.recipeService.addNewIngredientsInList(this.recipeDetail.ingredients);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
