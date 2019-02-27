import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsEpisodePage } from './details-episode';

@NgModule({
  declarations: [
    DetailsEpisodePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsEpisodePage),
  ],
})
export class DetailsEpisodePageModule {}
