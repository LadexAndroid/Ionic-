import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsMoviePage } from './details-movie';

@NgModule({
  declarations: [
    DetailsMoviePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsMoviePage),
  ],
})
export class DetailsMoviePageModule {}
