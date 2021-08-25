import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { UpdateItemComponent } from "./update-item/update-item.component";

@NgModule({
    declarations: [
        UpdateItemComponent
    ],
    imports: [IonicModule, CommonModule, FormsModule],
    exports: [
        UpdateItemComponent
    ]
})
export class ComponentModule {}