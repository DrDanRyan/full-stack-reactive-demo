import angular from 'angular';
import 'angular-material';
import 'angular-material/angular-material.css';
import 'angular-meteor';
import {ReactiveDict} from 'meteor/reactive-dict';
import queryBuilder from '/imports/queryBuilder';
import '/imports/Movies-collection';


const app = angular.module('movieApp', [
  'ngMaterial',
  'angular-meteor'
]);


app.controller('MovieController', MovieController);
MovieController.$inject = ['$reactive', '$scope'];
function MovieController($reactive, $scope) {
  // Attach ReactiveContext to Controller (Angular specific)
  $reactive(this).attach($scope);


  // Create App State and set default values
  const appState = new ReactiveDict();
  appState.setDefault({
    searchText: ''
  });


  // Bind App State to View Model
  this.autorun(() => {
    this.searchText = appState.get('searchText');
  });


  // Run method to get count of matching movies and bind to View Model
  this.autorun(() => {
    this.call('getCount', appState.get('searchText'), (err, count) => {
      if (err) { return console.log(err); }
      this.count = count;
    });
  });


  // Subscribe to data from server
  this.subscribe('movies', () => [appState.get('searchText')]);

  /*
  Tracker.autorun(() => {
    Meteor.subscribe('movies', appState.get('searchText'));
  });
  */


  // Helpers bind Server State (Minimongo docs) to View Model
  // Again, Tracker is registering dependencies on reactive data sources behind the scenes and
  // rerunning when needed.
  this.helpers({
    movies: () => {
      const searchText = appState.get('searchText');
      return Movies.find(queryBuilder(searchText), {sort: {ranking: 1}});
    }
  });


  // Actions (Make changes to appState)
  this.setSearchText = () => {
    appState.set('searchText', this.searchText);
  }

  this.clearSearchText = () => {
    appState.set('searchText', '');
  }
}
