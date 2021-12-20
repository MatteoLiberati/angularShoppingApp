import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations:[
        ShoppingListEditComponent,
        ShoppingListComponent,
    ],
    imports: [
       FormsModule,
       SharedModule,
       RouterModule.forChild([
        {path: '', component: ShoppingListComponent}
       ]),
    ]
})

export class ShoppingListModule {

}