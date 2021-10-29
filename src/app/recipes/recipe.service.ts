import { Recipe } from "./recipe.model";

export class RecipeService{
    private recipes : Recipe[] = [
        new Recipe("Roast Chicken", "with Chile-Basil Vinaigrette, Broccoli, and Potatoes", "https://cdn.pixabay.com/photo/2015/03/26/09/39/fried-chicken-690039_960_720.jpg"),
        new Recipe("Asparagus", "Asparagus With Lemon-Pepper Marinade From Bryant Terry", "https://cdn.pixabay.com/photo/2016/04/04/17/22/meal-1307604_960_720.jpg"),
        new Recipe("Beans", "Better Baked Beans", "https://cdn.pixabay.com/photo/2018/09/25/20/09/bush-beans-3702999_960_720.jpg"),
        new Recipe("Roast Chicken", "with Chile-Basil Vinaigrette, Broccoli, and Potatoes", "https://cdn.pixabay.com/photo/2015/03/26/09/39/fried-chicken-690039_960_720.jpg"),
        new Recipe("Asparagus", "Asparagus With Lemon-Pepper Marinade From Bryant Terry", "https://cdn.pixabay.com/photo/2016/04/04/17/22/meal-1307604_960_720.jpg"),
        new Recipe("Beans", "Better Baked Beans", "https://cdn.pixabay.com/photo/2018/09/25/20/09/bush-beans-3702999_960_720.jpg"),
      ];

      getRecipes(){
          return this.recipes.slice();
      }
}