import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { LoaderComponent } from './loader/loader.component';
import { CharacterImageComponent } from './components/characterImage/character-image.component';

@NgModule({
  imports: [IonicModule, TranslateModule, CommonModule],
  declarations: [LoaderComponent, CharacterImageComponent],
  exports: [LoaderComponent, CharacterImageComponent],
})
export class SharedModule {}
