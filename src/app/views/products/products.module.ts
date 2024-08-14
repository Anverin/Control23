import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {CatalogueComponent} from "./catalogue/catalogue.component";
import {ProductComponent} from "./product/product.component";
import {ProductCardComponent} from "../../shared/components/product-card/product-card.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    CatalogueComponent,
    ProductComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ProductsRoutingModule
  ],
  exports: [
   ProductsRoutingModule
  ]
})
export class ProductsModule { }
