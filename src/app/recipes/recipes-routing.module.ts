import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthGuard } from "../auth/auth-guard.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipe-resolver.resolver";
import { RecipesComponent } from "./recipes.component";
import { UnselectedItemComponent } from "./unselected-item/unselected-item.component";

const recipesRoutes =
    [{path: '',
            component: RecipesComponent,
            canActivate : [AuthGuard],
            children: [
            {path: '', component: UnselectedItemComponent},
            {path: 'new', component: RecipeEditComponent},
            {path: ':id', resolve: [RecipeResolver], component: RecipeDetailComponent},
            {path: ':id/edit', resolve: [RecipeResolver], component: RecipeEditComponent},
        ]}]

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})

export class RecipesRouting {

}
