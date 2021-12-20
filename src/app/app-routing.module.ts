import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  {path: '', redirectTo: '/recipes', pathMatch: "full"},
  {path: 'recipes', loadChildren: ()=>import('./recipes/recipes.module').then(m=>m.RecipesModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
