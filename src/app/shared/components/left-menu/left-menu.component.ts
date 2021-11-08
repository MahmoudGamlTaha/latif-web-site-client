import { Component, OnInit } from '@angular/core';
import { Menu, NavService } from '../../services/nav.service';

import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  public menuItems: Menu[];

  constructor(private router: Router, public navServices: NavService, private categoryService:CategoryService) {
    this.menuItems = [] ; 
    this.getMenuCategory(0);
  }

  ngOnInit(): void {
  }

  leftMenuToggle(): void {
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
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
        
        this.navServices.mainMenuToggle = false;
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
    
    menu.title = element.name;
    menu.active = element.acive;
    menu.badge = false;
  
    if(menuType == 'link'){
      
    }
    menu.type = menuType;
   
    menu.id = element.id;
    return menu;
  }
  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

  onHover(menuItem) {
    if(window.innerWidth > 1200 && menuItem){
       document.getElementById('unset').classList.add('sidebar-unset')
    } else {
      document.getElementById('unset').classList.remove('sidebar-unset')
    }
  }

}
