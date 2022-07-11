import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolsComponent } from './tools/tools.component';
import { LatifHomeComponent } from './main/latif-home.component';

const routes: Routes = [
  {
    path: 'tools',
    component: ToolsComponent
  },
  {
    path: 'app',
    component: LatifHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
