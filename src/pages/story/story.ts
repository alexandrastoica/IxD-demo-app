import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-story',
  templateUrl: 'story.html',
})
export class StoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
  }

  close() {
    this.view.dismiss();
  }

}
