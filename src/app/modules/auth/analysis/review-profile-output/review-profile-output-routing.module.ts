import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewProfileOutputComponent } from './review-profile-output.component';

const routes: Routes = [
  { path: '', component: ReviewProfileOutputComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewProfileOutputRoutingModule { }
