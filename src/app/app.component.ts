import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './catalogue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  private categories;
  private currentCategory;

  constructor(private catService : CatalogueService,
    private router : Router){}

  ngOnInit(): void {
    this.getCategories();
  }
  private getCategories() {
    this.catService.getResource("/categories").subscribe(data=>{
      this.categories=data;
    },err=>{
      console.log(err);
    })

  }

  getProductsByCat(c){
    this.currentCategory=c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }   

  onSelectedProducts(){
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/1/0");
  }
}
  
