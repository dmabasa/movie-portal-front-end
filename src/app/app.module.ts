import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { MovieComponent }  from './movie.component';
import { MovieService } from './movie.service';

@NgModule({
  imports: [     
        BrowserModule,
		HttpModule,
		ReactiveFormsModule
  ],
  declarations: [
        AppComponent,
		MovieComponent
  ],
  providers: [
        MovieService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
