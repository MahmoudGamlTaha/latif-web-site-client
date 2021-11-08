import { Component, OnInit } from '@angular/core';

import { Blog } from 'src/app/shared/classes/blogs';
import {BlogService} from '../../../shared/services/blog.service'

@Component({
  selector: 'app-blog-left-sidebar',
  templateUrl: './blog-left-sidebar.component.html',
  styleUrls: ['./blog-left-sidebar.component.scss']
})
export class BlogLeftSidebarComponent implements OnInit {

  page:number;
  blogs:any[];
  loading:boolean;
  constructor(public blogService:BlogService) { 
    this.page = 0;
    this.blogs = new Array<Blog>();
    this.loading = true;
  }

  ngOnInit(): void {
    this.blogService.getBlogs(this.page).subscribe((DataBlogs:any)=>{
      let info = DataBlogs.response.data;
      for(let element of info)
      {
      
        let blog:Blog = new Blog();
        blog.id = element.id;
        blog.category = element.category;
        blog.categoryId = element.category_id; 
        blog.categoryAr = element.categoryAr == null?blog.category:element.categoryAr;
        blog.description = element.description;
        blog.CreatedAt = element.createdDate;
        if(info.user != null){
        blog.createdBy.id = element.user.id;
        blog.createdBy.avatar = element.user.avatar;
        blog.createdBy.firstName = element.user.firstName;
        blog.createdBy.lastName = element.user.lastName == null?"":element.user.lastName;
        }
        if(info.city != null){
         blog.createdBy.city = element.city.cityAr;
        }
        
        blog.title = element.title;
        blog.image = element.image==null?"/assets/images/blog/default.jpg":element.image;
        blog.images = element.images;
        this.blogs.push(blog);
        
    }
  
  });
  }

}
