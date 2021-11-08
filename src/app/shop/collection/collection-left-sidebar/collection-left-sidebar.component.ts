import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UserAds } from '../../../shared/classes/UserAds';
import { UserAdsService } from "../../../shared/services/product.service";
import { ViewportScroller } from '@angular/common';
import { adsFilter } from 'src/app/shared/classes/adsFilter';

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss']
})
export class CollectionLeftSidebarComponent implements OnInit {
  
  public grid: string = 'col-xl-3 col-md-6';
  public layoutView: string = 'grid-view';
  public products: any[] = [];
  public brands: any[] = [];
  public colors: any[] = [];
  public size: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 1200;
  public tags: any[] = [];
  public category: string;
  public type:string;
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean;
  public adsFilter: adsFilter; 
  constructor(private route: ActivatedRoute, private router: Router,
    private viewScroller: ViewportScroller, public productService: UserAdsService) {   
      // Get Query params..
    
        this.adsFilter = {type : "ALL"}  
        this.route.queryParams.subscribe(params => {
        this.brands = params.brand ? params.brand.split(",") : [];
        this.colors = params.color ? params.color.split(",") : [];
        this.size  = params.size ? params.size.split(",")  : [];
        this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
        this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
        this.tags = [...this.brands, ...this.colors, ...this.size]; // All Tags Array
        
        this.category = params.category ? params.category : 0;
        this.type = params.type?params.type : 0;
        this.sortBy   = params.sortBy ? params.sortBy : 'ascending';
        this.pageNo   = params.page ? params.page : this.pageNo;
          if(params.category){
            this.adsFilter.category = Number(this.category);  
          }
           this.productService.getFilterAds(this.adsFilter).subscribe((items:any)=>{
             this.products = items.response.data;
             this.loader = false;  
             
           });
                      // Price Filter
          //this.products = this.products.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice) 
          // Paginate Products
        //  this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
         // this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
        })
      //})
  }

  ngOnInit(): void {
    this.loader = true;
  }


  // Append filter value to Url
  updateFilter(tags: any) {
    tags.page = null; // Reset Pagination
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: tags,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null},
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Remove Tag
  removeTag(tag) {
  
    this.brands = this.brands.filter(val => val !== tag);
    this.colors = this.colors.filter(val => val !== tag);
    this.size = this.size.filter(val => val !== tag );

    let params = { 
      brand: this.brands.length ? this.brands.join(",") : null, 
      color: this.colors.length ? this.colors.join(",") : null, 
      size: this.size.length ? this.size.join(",") : null
    }

    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Clear Tags
  removeAllTags() {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: {},
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
    
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if(value == 'list-view')
      this.grid = 'col-lg-12';
    else
      this.grid = 'col-xl-3 col-md-6';
  }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

}
