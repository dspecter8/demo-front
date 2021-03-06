import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products;
  private editPhoto : boolean;
  private currentProduct;
  private selectedfiles;
  private progress: number;
  private currentFileUpload :any;

  constructor(private catService: CatalogueService,
    private route: ActivatedRoute,
    private router:Router) {
    }

  
  ngOnInit() {

      this.router.events.subscribe((val)=>{
        if((val instanceof NavigationEnd) ){
          let url = val.url;
          console.log(url);
              let p1=this.route.snapshot.params.p1;
    
          if(p1==1){
            this.getProducts("/products/search/selectedProducts");
          }else if(p1==2){
            let idCat=this.route.snapshot.params.p2;
            this.getProducts('/categories/'+idCat+'/products');
          }
        }
      });
      let p1=this.route.snapshot.params.p1;
       if(p1==1){
            this.getProducts("/products/search/selectedProducts");
          }
  }
  getProducts(url) {
    this.catService.getResource(url)
    .subscribe(data=>{
      this.products=data;
    },err=>{
      console.log(err);
    })
  }
  onEditPhoto(p){
    this.currentProduct=p;
        this.editPhoto =true; 
       
    }
    OnSelectedfile(event){
      this.selectedfiles=event.target.files;
    }

    uploadPhoto() {
      this.progress=0;
      this.currentFileUpload= this.selectedfiles.item(0)
      
      this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event =>{
        if(event.type==HttpEventType.UploadProgress){
          this.progress = Math.round(100*event.loaded/event.total);
        }else if(event instanceof HttpResponse){
          alert("Fin de t?l?chargement...")
        }
      },err=>{
      alert("Probl?me de chargement");
      })
      
     this.selectedfiles = undefined;
    }
}
