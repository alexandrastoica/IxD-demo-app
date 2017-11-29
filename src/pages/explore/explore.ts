import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavController, ModalController, Slides } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { FiltersPage } from '../filters/filters';
import { StoryPage } from '../story/story';
import { AddPage } from '../add/add';

declare var google;

@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})
export class ExplorePage {
  @ViewChild("map") map: ElementRef;
  @ViewChild(Slides) slides: Slides;
  googleMap: any;
  isMoving: boolean = false;
  randomGeoPoints: Array<any> = [];

  constructor(public navCtrl: NavController, private platform: Platform, private geoLoc: Geolocation, public modal: ModalController) {
    this.isMoving = false;
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {
    // initialise google maps and center it at the current position
    this.geoLoc.getCurrentPosition().then((position) => {
      // get coordinates
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      // set map style (retro)
      const style = [{
        "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b9d3c2"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
            }
          ]
        }
      ]

      // initialise map options
      const mapOpt = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        myLocationButton: true,
        styles: style
      }

      // initialise map
      this.googleMap = new google.maps.Map(this.map.nativeElement, mapOpt);

      // place random markers in map
      this.placeRandomMarkers(position);


    }, (err) => {
      console.log(err);
    });
  }

  filter() {
    // opens filter page
    let modal = this.modal.create(FiltersPage);
    modal.present();
  }

  openStory() {
    // opens post/story of the user
    let modal = this.modal.create(StoryPage);
    modal.present();
  }

  add() {
    // opens modal to add content to map
    let modal = this.modal.create(AddPage);
    modal.present();
  }

  // when slide changes set center of map at
  // the marker corresponding to the preview post
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    let marker = this.randomGeoPoints[currentIndex];
    this.googleMap.setCenter(marker);
  }

  // get random coordinates by center and radius
  generateRandomPoints(center, radius) {
  	let x0 = center.lng;
  	let y0 = center.lat;
  	// Convert Radius from meters to degrees.
  	let rd = radius/111300;

  	let u = Math.random();
  	let v = Math.random();

  	let w = rd * Math.sqrt(u);
  	let t = 2 * Math.PI * v;
  	let x = w * Math.cos(t);
  	let y = w * Math.sin(t);

  	let xp = x/Math.cos(y0);

  	// resulting point
  	return {'lat': y+y0, 'lng': xp+x0};
  }

  // place the markers on map
  placeRandomMarkers(position) {
    [0,1,2,3,4,5,6,7,8,9].forEach((i) => {
      // generate a new point
      let point = this.generateRandomPoints({'lat':position.coords.latitude, 'lng':position.coords.longitude}, 300);
      // add it to the array
      this.randomGeoPoints.push(point);

      // place the marker on the map
      let marker = new google.maps.Marker({
        position: point,
        map: this.googleMap,
        icon: '../../assets/avatars/tomato.png',
        id: i
      });

      // set center of map on click
      // change preview slide to the corresponding one
      marker.addListener('click', () => {
        this.googleMap.setCenter(marker.getPosition());
        this.slides.slideTo(marker.get('id'), 100);
      });
    });
  }

}
