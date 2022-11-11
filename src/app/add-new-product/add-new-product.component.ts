import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  productForm = new FormGroup({
    productName: new FormControl("", Validators.required),
    productDescription: new FormControl("", Validators.required),
    productDiscountedPrice: new FormControl("", Validators.required),
    productActualPrice: new FormControl("", Validators.required)
  })
  get productDiscountedPrice(){
    if(this.productForm.get("productDiscountedPrice")?.value != null &&
     this.productForm.get("productDiscountedPrice")?.value != undefined)
        return +this.productForm.get("productDiscountedPrice")?.value
    else
        return 0;
}

  addProduct() {
    console.log("slm");
    const product: Product= {
      productName: this.productForm.get("productName")?.value ?? "",
      productDescription: this.productForm.get("productDescription")?.value ?? "",
      productDiscountedPrice: this.productDiscountedPrice ? this.productDiscountedPrice : null,
      productActualPrice:this.productForm.get("productActualPrice")?.value
    }
    this.productService.addProduct(product).subscribe(
      (response: Product) => {
        console.log(response);
      },
      (error : HttpErrorResponse) =>{
        console.log(error);
      }
    );

  }

}
