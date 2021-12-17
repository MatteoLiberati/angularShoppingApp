import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipesRouting } from './recipes/recipes-routing.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [  
  {path: '', redirectTo: '/recipes', pathMatch: "full"},
  {path: 'auth', component: AuthComponent},
  {path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
          RecipesRouting]
})
export class AppRoutingModule { }
