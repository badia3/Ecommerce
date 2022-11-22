import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  faTrash = faTrash ;
  faEdit= faEdit;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Discounted Price', 'Product Actual Price','Edit','Delete'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(){
    this.productService.getAllProducts().subscribe(
      (resp: Product[]) => {
        console.log(resp);
        this.productDetails = resp;

      },(error: HttpErrorResponse) =>{
        console.log(error);

      }
    );
  }

  public deleteProduct(productId: number){
    this.productService.deleteProduct(productId).subscribe(
      (resp:any) => {
        this.getAllProducts();

      },
      (error:HttpErrorResponse)=>{
        console.log(error);

      }
    );


  }

}
