import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailResolve } from './recipes/recipe-detail/recipe-detail-resolve.service';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { UnselectedItemComponent } from './recipes/unselected-item/unselected-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [  
  {path: '', redirectTo: '/recipes', pathMatch: "full"},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: UnselectedItemComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', resolve:{recipeDetail : RecipeDetailResolve} ,component: RecipeDetailComponent},
    {path: ':id/edit', component: RecipeEditComponent},
  ]},
  {path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
