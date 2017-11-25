import { Component } from '@angular/core';

import { AddPage } from '../add/add';
import { ExplorePage } from '../explore/explore';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ExplorePage;
  tab2Root = AddPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
