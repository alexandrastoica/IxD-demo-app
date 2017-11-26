import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AddPage } from '../pages/add/add';
import { ProfilePage } from '../pages/profile/profile';
import { FiltersPage } from '../pages/filters/filters';
import { StoryPage } from '../pages/story/story';
import { ExplorePage } from '../pages/explore/explore';
import { SavedPage } from '../pages/saved/saved';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { MapPinComponent } from '../components/map-pin/map-pin';


@NgModule({
  declarations: [
    MyApp,
    AddPage,
    ProfilePage,
    ExplorePage,
    FiltersPage,
    StoryPage,
    TabsPage,
    SavedPage,
    MapPinComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPage,
    ProfilePage,
    ExplorePage,
    FiltersPage,
    StoryPage,
    TabsPage,
    SavedPage,
    MapPinComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
