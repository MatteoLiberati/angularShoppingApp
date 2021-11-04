import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Injectable({
    providedIn: 'root',
})

export class RecipeDetailResolve implements Resolve<Recipe> {
    
    constructor(private recipeService: RecipeService, private router: Router){}

    resolve(
        activeroute: ActivatedRouteSnapshot,
        stateroute: RouterStateSnapshot,
    ) : Observable<Recipe> | Promise<Recipe> | Recipe {
        if(this.recipeService.getRecipes().length > +activeroute.params['id'] && +activeroute.params['id'] >= 0){
            return this.recipeService.getRecipe(+activeroute.params['id']);
        }else{
            this.recipeService.Selected.emit(false);
            this.router.navigate(['']);
        }
    }
}