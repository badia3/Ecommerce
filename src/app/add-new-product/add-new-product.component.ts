import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandele } from '../_model/file.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit,OnChanges {

  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer) { }
    uploadedPics: any[]=[];
    profilePic: any;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  productForm = new FormGroup({
    productName: new FormControl("", Validators.required),
    productDescription: new FormControl("", Validators.required),
    productDiscountedPrice: new FormControl(null, Validators.required),
    productActualPrice: new FormControl(null, Validators.required),
    productImage: new FormControl(null,Validators.required),
  })
  get productDiscountedPrice() {
    if (this.productForm.get('productDiscountedPrice')?.value)
      return +this.productForm.get('productDiscountedPrice')?.value!
    else
      return null!
  }
  get productActualPrice(){
    if (this.productForm.get('productActualPrice')?.value)
      return +this.productForm.get('productActualPrice')?.value!
    else
      return null!
  }





  addProduct() {
    var product= new FormData();
    this.uploadedPics.forEach(pic => {
      product.append("imageFile",pic)
    })
    product.append("product",
    new Blob([JSON.stringify({
      "productName": this.productForm.get('productName')?.value ?? '',
      "productDescription": this.productForm.get('productDescription')?.value ?? '',
      "productDiscountedPrice": this.productDiscountedPrice,
      "productActualPrice":this.productActualPrice,
    })], {
    type: 'application/json'
  }))


    this.productService.addProduct(product).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
    this.productForm.reset();
  }

  onChangeProfilePic(event: any) {
    const reader = new FileReader();
      this.uploadedPics.push(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.profilePic = reader.result;
      }
    };

showImage(file: any){
  return this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
       )
}

removeImage(i:number){
    this.uploadedPics.splice(i,1);
  }
fileDropped(file : any){
  this.uploadedPics.push(file.target.file[0]);

}

}
