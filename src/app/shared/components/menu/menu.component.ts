import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';
import { CategoryType } from '../../classes/categoryType';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menuItems: Menu[];

  constructor(private router: Router, public navServices: NavService, private categoryService:CategoryService) {
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
       // console.log(element.name);
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
        console.log(this.menuItems);
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
      console.log(menu.path);
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
