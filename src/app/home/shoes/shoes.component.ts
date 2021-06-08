import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategorySlider, ProductSlider } from '../../shared/data/slider';
import { UserAds } from '../../shared/classes/UserAds';
import { UserAdsService } from '../../shared/services/product.service';
import { BlogService } from 'src/app/shared/services/blog.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.scss']
})
export class ShoesComponent implements OnInit, OnDestroy {

  public themeLogo: string = 'https://res.cloudinary.com/highcoder/image/upload/v1621478193/pet-app/web/logo_xwhfvi.png'; // Change Logo
  
  public products: any;
  public petCategories:any;
  public productCollections: any[] = [];
  public current_page:number = 0;
  public CategorySliderConfig: any = CategorySlider;
  public ProductSliderConfig: any = ProductSlider;
  
  constructor(public productService: UserAdsService, public blogService: BlogService, public categoryService: CategoryService) {
    this.getProduct();
    this.getBlog();
    this.getPetCategories();
  }
public getProduct(){
    this.productService.getProducts().subscribe((rawData:any)=> {
    this.products =  rawData.response.data;
  });
}
public getPetCategories(){
  
  this.categoryService.getPetCategory().subscribe((rawData:any)=> {
     this.petCategories = rawData.response.data;
     console.log(this.petCategories);
  });
}
public getBlog(){
  this.blogService.getBlogs(this.current_page).subscribe((item:any) => {
    this.blogs = item.response.data;
  });
}
  // sliders
  public sliders = [{
    title: 'special offer',
    subTitle: 'men shoes',
    image: 'assets/images/slider/23.jpg'
  }, {
    title: 'special offer',
    subTitle: 'men shoes',
    image: 'assets/images/slider/24.jpg'
  }];
  

  public sizes = ['size 06', 'size 07', 'size 08', 'size 09', 'size 10'];

  // Categories
  public categories = [{
    image: 'https://res.cloudinary.com/highcoder/image/upload/v1617372773/pet-app/drawable-xhdpi/fish_sx4r4h.png',
    title: 'Fishs'
    
  }, {
    image: 'https://res.cloudinary.com/highcoder/image/upload/v1617372773/pet-app/drawable-xhdpi/hamster-facing-right_crcmun.png',
    title: 'Hamster'
  }, {
    image: 'https://res.cloudinary.com/highcoder/image/upload/v1617354217/pet-app/drawable-xhdpi/dog_1_x2ak87.png',
    title: 'Dogs'
  }, {
    image: 'https://res.cloudinary.com/highcoder/image/upload/v1617372773/pet-app/drawable-xhdpi/Path_671_qdf3cy.png',
    title: 'Cats'
  }/*, {
    image: 'assets/images/icon/cat5.png',
    title: 'heels'
  }, {
    image: 'assets/images/icon/cat6.png',
    title: 'boots'
  },{
    image: 'assets/images/icon/cat1.png',
    title: 'sport shoes'
  }*/];

  // Collection banner
  public serviceCollection = [{
    image: 'https://res.cloudinary.com/highcoder/image/upload/v1619480961/pet-app/drawable-xhdpi/Page-1_bjsles.png',
    save: '',
    title: 'Clinic'
  }, {
    image: 'https://res.cloudinary.com/highcoder/image/upload/v1619480984/pet-app/drawable-xxxhdpi/housing_iw3wfv.png',
    save: '',
    title: 'Hostly'
  },
  {
    image: 'https://res.cloudinary.com/highcoder/image/upload/v1619480961/pet-app/drawable-xhdpi/Path_173_io6qem.png',
    save: '',
    title: 'Deliveries'
  },
  {
    image: 'https://res.cloudinary.com/highcoder/image/upload/v1619480961/pet-app/drawable-xhdpi/Group_9862_jpx9ap.png',
    save: '',
    title: 'Shower&HairCut'
  }
];

  // Collection banner
  public collections2 = [{
    image: 'assets/images/categories/14.png',
    title: 'men'
  }, {
    image: 'assets/images/categories/15.png',
    title: 'women'
  }, {
    image: 'assets/images/categories/16.png',
    title: 'kids'
  }];

  // Blog
  public blogs = [{
    image: 'assets/images/blog/33.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/34.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/35.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/36.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  // Logo
  public logos = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];

  ngOnInit(): void {
    // Change color for this layout
    document.documentElement.style.setProperty('--theme-deafult', '#FF4C3B');
  }

  ngOnDestroy(): void {
    // Remove Color
    document.documentElement.style.removeProperty('--theme-deafult');
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }

}
