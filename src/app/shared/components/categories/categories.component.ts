import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAds } from '../../classes/UserAds';
import { CategoryService } from '../../services/category.service';
import { UserAdsService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  filterbyCategory: any;
  public products: UserAds[] = [];
  public collapse: boolean = true;
  constructor(public category: CategoryService, private router: ActivatedRoute) {
    let id = parseInt(this.router.snapshot.queryParams.category);
    console.log(id);

    this.category.getCategoryByTypeId(1).subscribe((items: any) => {
      this.filterbyCategory = items.response.data
      console.log(this.filterbyCategory[0].category.name);
    })
  }

  ngOnInit(): void {
  }

  // get filterbyCategory() {
  //   const category = [...new Set(this.products.map(product => product.type))]
  //   return category
  // }

}
