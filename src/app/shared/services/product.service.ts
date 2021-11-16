import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UserAds } from '../classes/UserAds';
import { server } from 'src/environments/environment';
import { adsFilter } from '../classes/adsFilter';
import { BasicResponse } from '../models/reponse.model';

const state = {
  products: JSON.parse(localStorage['products'] || '[]'),
  wishlist: JSON.parse(localStorage['wishlistItems'] || '[]'),
  compare: JSON.parse(localStorage['compareItems'] || '[]'),
  cart: JSON.parse(localStorage['cartItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class UserAdsService {

  public Currency = { name: 'SAR', currency: 'SAR', price: 1 } // Default Currency
  public OpenCart: boolean = false;
  public userAds;

  baseUrl = server.url;

  constructor(private http: HttpClient,
    private toastrService: ToastrService) { }

  /*
    ---------------------------------------------
    ---------------  UserAds  -------------------
    ---------------------------------------------
  */
  // UserAds
  public getProducts(): Observable<any[]> {
    //this.UserAdss = this.http.get<UserAds[]>('assets/data/products.json').pipe(map(data => data));
    //this.UserAdss.subscribe(next => { localStorage['products'] = JSON.stringify(next) });
    //return this.UserAdss = this.UserAdss.pipe(startWith(JSON.parse(localStorage['products'] || '[]')));
    let adsUrl = this.baseUrl + '/api/public/ads/nearest';
    //
    this.userAds = this.http.get<any[]>(adsUrl);
    return this.userAds;
  }
  public getFilterAds(adsFilter: adsFilter): Observable<any[]> {
    let adsUrl = this.baseUrl + '/api/public/ads/nearest?pageSize=20';
    if (adsFilter.category > 0) {
      adsUrl += '&category=' + adsFilter.category;
    }
    if (adsFilter.type != 'ALL') {
      adsUrl += '&type=' + adsFilter.type;
    }


    return this.http.get<any[]>(adsUrl);
  }
  public getAdsById(id: number): Observable<any> {
    let adById = this.baseUrl + '/api/public/ads/ad-by-Id?id=' + id;

    return this.http.get<any>(adById);
  }

  // Get UserAdss
  public get getUserAdss(): Observable<UserAds[]> {
    this.getProducts();
    return this.userAds;
  }

  // Get UserAdss By Slug
  public getUserAdsBySlug(slug: number): Observable<UserAds> {
    return this.userAds.pipe(map((items: any) => {
      return items.response.data.find((item: any) => {
        return item.id === slug;
      });
    }));
  }


  /*
    ---------------------------------------------
    ---------------  Wish List  -----------------
    ---------------------------------------------
  */

  // Get Wishlist Items
  public get wishlistItems(): Observable<UserAds[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.wishlist);
      observer.complete();
    });
    return <Observable<UserAds[]>>itemsStream;
  }

  // Add to Wishlist
  public addToWishlist(product): any {
    const wishlistItem = state.wishlist.find(item => item.id === product.id)
    if (!wishlistItem) {
      state.wishlist.push({
        ...product
      })
    }
    this.toastrService.success('UserAds has been added in wishlist.');
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  // Remove Wishlist items
  public removeWishlistItem(product: UserAds): any {
    const index = state.wishlist.indexOf(product);
    state.wishlist.splice(index, 1);
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  /*
    ---------------------------------------------
    -------------  Compare UserAds  -------------
    ---------------------------------------------
  */

  // Get Compare Items
  public get compareItems(): Observable<UserAds[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.compare);
      observer.complete();
    });
    return <Observable<UserAds[]>>itemsStream;
  }

  // Add to Compare
  public addToCompare(product): any {
    const compareItem = state.compare.find(item => item.id === product.id)
    if (!compareItem) {
      state.compare.push({
        ...product
      })
    }
    this.toastrService.success('UserAds has been added in compare.');
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  // Remove Compare items
  public removeCompareItem(product: UserAds): any {
    const index = state.compare.indexOf(product);
    state.compare.splice(index, 1);
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  /*
    ---------------------------------------------
    -----------------  Cart  --------------------
    ---------------------------------------------
  */

  // Get Cart Items
  public get cartItems(): Observable<UserAds[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.cart);
      observer.complete();
    });
    return <Observable<UserAds[]>>itemsStream;
  }

  // Add to Cart
  public addToCart(product): any {
    const cartItem = state.cart.find(item => item.id === product.id);
    const qty = product.quantity ? product.quantity : 1;
    const items = cartItem ? cartItem : product;
    const stock = this.calculateStockCounts(items, qty);

    if (!stock) return false

    if (cartItem) {
      cartItem.quantity += qty
    } else {
      state.cart.push({
        ...product,
        quantity: qty
      })
    }

    this.OpenCart = true; // If we use cart variation modal
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    return true;
  }

  // Update Cart Quantity
  public updateCartQuantity(product: UserAds, quantity: number): UserAds | boolean {
    return state.cart.find((items, index) => {
      if (items.id === product.id) {
        const qty = state.cart[index].quantity + quantity
        const stock = this.calculateStockCounts(state.cart[index], quantity)
        if (qty !== 0 && stock) {
          state.cart[index].quantity = qty
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        return true
      }
    })
  }

  // Calculate Stock Counts
  public calculateStockCounts(product, quantity) {
    const qty = product.quantity + quantity
    const stock = product.stock
    if (stock < qty || stock == 0) {
      this.toastrService.error('You can not add more items than available. In stock ' + stock + ' items.');
      return false
    }
    return true
  }

  // Remove Cart items
  public removeCartItem(product: UserAds): any {
    const index = state.cart.indexOf(product);
    state.cart.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    return true
  }

  // Total amount 
  public cartTotalAmount(): Observable<number> {
    return this.cartItems.pipe(map((product: UserAds[]) => {
      return product.reduce((prev, curr: UserAds) => {
        let price = curr.price;
        if (curr.discount) {
          price = curr.price - (curr.price * curr.discount / 100)
        }
        return (prev + price * curr.quantity) * this.Currency.price;
      }, 0);
    }));
  }

  /*
    ---------------------------------------------
    ------------  Filter UserAds  ---------------
    ---------------------------------------------
  */

  // Get UserAds Filter
  public filterUserAdss(filter: any): Observable<UserAds[]> {
    /*return this.products.pipe(map(product => 
      product.filter((item: UserAds) => {
        if (!filter.length) return true
        const Tags = filter.some((prev) => { // Match Tags
          if (item.tags) {
            if (item.tags.includes(prev)) {
              return prev
            }
          }
        })
        return Tags
      })
    ));*/
    return new Observable<UserAds[]>();
  }

  // Sorting Filter
  public sortUserAdss(products: UserAds[], payload: string): any {

    if (payload === 'ascending') {
      return products.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'a-z') {
      return products.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'z-a') {
      return products.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        } else if (a.name < b.name) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'low') {
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'high') {
      return products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        }
        return 0;
      })
    }
  }

  /*
    ---------------------------------------------
    ------------- UserAds Pagination  -----------
    ---------------------------------------------
  */
  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 16) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage < paginateRange - 1) {
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }


  /******/
  checkChatAds(ads: number): Observable<BasicResponse> {
    let url_ = this.baseUrl + "/api/public/chat/check-chat-ads?";
    if (ads === undefined || ads === null)
      throw new Error("The parameter 'ads' must be defined and cannot be null.");
    else
      url_ += "ads=" + encodeURIComponent("" + ads) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_)
  }

  reasons(): Observable<BasicResponse> {
    let url_ = this.baseUrl + "/api/public/reasons";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_)
  }

  makeReport(request: ReportRequest): Observable<BasicResponse> {
    let url_ = this.baseUrl + "/api/public/reportedAds/makeReport";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(request);

    return this.http.post<any>(url_, content_)
  }

  /*add ads*/
  listAdsType(): Observable<BasicResponse> {
    let url_ = this.baseUrl + "/api/public/ads-type/list";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_)
  }

  getCreateForm(adType: AdType, category: string | null | undefined): Observable<BasicResponse> {
    let url_ = this.baseUrl + "/api/public/ads/get-create-form?";
    if (adType === undefined || adType === null)
      throw new Error("The parameter 'adType' must be defined and cannot be null.");
    else
      url_ += "adType=" + encodeURIComponent("" + adType) + "&";
    if (category !== undefined && category !== null)
      url_ += "category=" + encodeURIComponent("" + category) + "&";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_)
  }


  catByAdTypeNoParentGet(adtypeId: number, page: string | null | undefined): Observable<BasicResponse> {
    let url_ = this.baseUrl + "/api/public/cat-by-adType-no-parent/type={adtypeId}";
    if (adtypeId === undefined || adtypeId === null)
      throw new Error("The parameter 'adtypeId' must be defined.");
    url_ = url_.replace("{adtypeId}", encodeURIComponent("" + adtypeId));
    if (page !== null && page !== undefined)
      url_ = url_.replace("{page}", encodeURIComponent("" + page));
    else
      url_ = url_.replace("/{page}", "");
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_)
  }

  getDataByUrl(url:string): Observable<BasicResponse> {
    let url_ = this.baseUrl + url;
    return this.http.get<any>(url_)
  }

  createAds(userAdsRequest:  DynamicAdsRequest): Observable<BasicResponse> {
    let url_ = this.baseUrl + "/api/public/ads/create";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(userAdsRequest);
   
    return this.http.post<any>(url_, content_)
}


}

export interface ReportRequest {
  adId: number | undefined;
  otherReason: string | undefined;
  reason: number | undefined;
  type: ReportRequestType | undefined;
}

export enum ReportRequestType {
  UNSEEN = "UNSEEN",
  REPORT = "REPORT",
  INTEREST = "INTEREST",
}

export enum AdType {
  SERVICE = "SERVICE",
  MEDICAL = "MEDICAL",
  CONTRACT = "CONTRACT",
  OCCASIONAL = "OCCASIONAL",
  TRANSPORTING = "TRANSPORTING",
  OTHERS = "OTHERS",
  PETS = "PETS",
  PET_CARE = "PET_CARE",
  ACCESSORIES = "ACCESSORIES",
  Dogs = "Dogs",
  DELIVERY = "DELIVERY",
  VETERINARY = "VETERINARY",
  DRIVER = "DRIVER",
  COMMERCIAL = "COMMERCIAL",
  ALL = "ALL",
}

export interface DynamicAdsRequest{
  external: boolean | undefined;
  type: string | undefined;
  userAds: [];
}