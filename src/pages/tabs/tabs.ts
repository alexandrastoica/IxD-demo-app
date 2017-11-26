import { Component } from '@angular/core';

import { SavedPage } from '../saved/saved';
import { ExplorePage } from '../explore/explore';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ExplorePage;
  tab2Root = SavedPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
