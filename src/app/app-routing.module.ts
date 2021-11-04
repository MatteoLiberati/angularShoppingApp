import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailResolve } from './recipes/recipe-detail/recipe-detail-resolve.service';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { UnselectedItemComponent } from './recipes/unselected-item/unselected-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [  
  {path: '', redirectTo: '/recipes', pathMatch: "full"},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: UnselectedItemComponent},
    {path: ':id', resolve:{recipeDetail : RecipeDetailResolve} ,component: RecipeDetailComponent},
  ]},
  {path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
