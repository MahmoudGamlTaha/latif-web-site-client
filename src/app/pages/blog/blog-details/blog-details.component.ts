import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Blog } from 'src/app/shared/classes/blogs';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blog:Blog;
  mainImage:string;
  constructor(private blogService:BlogService, private route:ActivatedRoute, private router:Router) { 
    this.blog = new Blog();    
  }

  ngOnInit(): void {
    let params = this.route.snapshot.params; 
    if(!this.route.snapshot.params){
      return;
    }
    this.blog.id = params.id;
    this.getBlogDetails();
  }
  getBlogDetails(){
    this.blogService.getBlogById(this.blog.id).subscribe(retItem =>{
        let item = retItem.response.data;
        this.blog.image = item.image==null?"/assets/images/blog/default.jpg":item.image;;
        this.blog.images = item.images;
        this.blog.title = item.title;
        this.blog.category = item.category;
        this.blog.categoryAr = item.categoryAr;
        this.blog.categoryId = item.category_id;
        this.blog.description = item.description;
        this.blog.CreatedAt = item.createdDate;
        
       this.mainImage = this.blog.image;
        if(item.user != null){
          this.blog.createdBy = item.user;
          this.blog.createdBy.avatar = item.user.avatar;
          this.blog.createdBy.id = item.user.id;
          this.blog.createdBy.adsCount = item.user.prodCount;
          this.blog.createdBy.city = item.user.city;
          this.blog.createdBy.firstName = item.user.firstName;
          this.blog.createdBy.lastName = item.user.lastName == null?"":item.user.lastName;
          this.blog.createdBy.joinDate = item.user.registrationDate;
          
 
        }
    });
 //   
   }
  public changeImg(image:string){
    alert(image);
    this.mainImage = image;
  }
  public test(){
    alert(88);
  }
}
