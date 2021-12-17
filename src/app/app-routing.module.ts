import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipesRouting } from './recipes/recipes-routing.module';

const routes: Routes = [  
  {path: '', redirectTo: '/recipes', pathMatch: "full"},
  {path: 'auth', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
          RecipesRouting]
})
export class AppRoutingModule { }
