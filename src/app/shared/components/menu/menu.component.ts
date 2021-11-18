import { Component, OnInit } from '@angular/core';
import { Menu, NavService } from '../../services/nav.service';

import { CategoryService } from '../../services/category.service';
import { CategoryType } from '../../classes/categoryType';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menuItems: Menu[];

  constructor(private router: Router, public navServices: NavService, private categoryService:CategoryService, private TranslateService:TranslateService) {
  /* this.navServices.items.subscribe(menuItems => this.menuItems = menuItems );
    this.router.events.subscribe((event) => {
      this.navServices.mainMenuToggle = false;
    });*/
    this.menuItems = [];
   this.getMenuCategory(0);
  }

  ngOnInit(): void {
  }
  getMenuCategory(type:number){
    this.categoryService.getCategoryByTypeId(type).subscribe((categories :any)=>{
      
      let categoryTypes = categories.response.data;
      categoryTypes.forEach(element => {
       // 
        let menu:Menu = this.createMenuItem(element, "type","sub");
         
        this.categoryService.getCategoryByTypeId(menu.id).subscribe((subs:any)=>{
            let subsCatgs = subs.response.data; 
             subsCatgs.forEach(element => {
             let smenu:Menu = this.createMenuItem(element, "category","extLink");
             menu.children.push(smenu);
            });
        });
        /*  menu.title = element.name;
          menu.active = element.acive;
          menu.badge = false;
          menu.path = "/shop/collection/left/sidebar?type="+element.id;
          menu.type = 'sub';
          menu.children = [];*/
          
        this.menuItems.push(menu);
        
      });
    })
  }
  createMenuItem(element:any, key:string, menuType:string):Menu{
    let menu:Menu ={};
    if(menuType == 'extLink'){
      element = element.category;
      menu.path = '#/shop/collection/left/sidebar?'+key+"="+element.id;
    }else if(menuType =='sub'){
      menu.children = [];
    }
    
    menu.title = this.TranslateService.currentLang ==='en' ? element.name : element.nameAr;
    menu.active = element.acive;
    menu.badge = false;
  
    if(menuType == 'link'){
      
    }
    menu.type = menuType;
   
    menu.id = element.id;
    return menu;
  }
  mainMenuToggle(): void {
    this.navServices.mainMenuToggle = !this.navServices.mainMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

}
