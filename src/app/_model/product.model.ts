import { FileHandele } from "./file.model";

// export interface Product{
//     productName: String | null,
//     productDescription: String | null,
//     productDiscountedPrice: number | null,
//     productActualPrice: number | null,
//     productImages: FileHandele[]
// }
export interface Product{
    productName: String,
    productDescription: String,
    productDiscountedPrice: number,
    productActualPrice: number,
    productImages: FileHandele[]
}