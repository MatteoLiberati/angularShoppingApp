import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.guard';
import { AuthComponent } from './auth/auth.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolver } from './recipes/recipe-resolver.resolver';
import { RecipesComponent } from './recipes/recipes.component';
import { UnselectedItemComponent } from './recipes/unselected-item/unselected-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [  
  {path: '', redirectTo: '/recipes', pathMatch: "full"},
  {path: 'auth', component: AuthComponent},
  {path: 'recipes',
   component: RecipesComponent, 
   canActivate : [AuthGuard],
   children: [
    {path: '', component: UnselectedItemComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', resolve: [RecipeResolver], component: RecipeDetailComponent},
    {path: ':id/edit', resolve: [RecipeResolver], component: RecipeEditComponent},
  ]},
  {path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
