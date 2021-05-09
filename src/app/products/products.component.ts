import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products;

  constructor(private catService: CatalogueService) { }

  
  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.catService.getResource("/products/search/selectedProducts")
    .subscribe(data=>{
      this.products=data;
    },err=>{
      console.log(err);
    })
  }

}
