import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id : number;
  editMode : boolean = false;
  recipeForm : FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit(){
    this.route.params
    .subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm(){
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let recipeIngredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            "name" : new FormControl(recipeIngredient.name, Validators.required),
            "amount" :  new FormControl(recipeIngredient.amount, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
      "name" : new FormControl(recipeName, Validators.required),
      "imagePath" : new FormControl(recipeImagePath, Validators.required),
      "description" : new FormControl(recipeDescription, Validators.required),
      "ingredients" : recipeIngredients,
    })
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get("ingredients")).push( new FormGroup({
      "name" : new FormControl(null, Validators.required),
      "amount" : new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
    }))
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['']);
    this.onDelete();
  }

  onDelete(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  getIngredientscontrols(){
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }
}