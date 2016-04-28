import {Meteor} from 'meteor/meteor';
import '/imports/Movies-collection';
import queryBuilder from '/imports/queryBuilder';
import seedDatabase from '/imports/server/seedDatabase';

if (Movies.find().count() === 0) { seedDatabase(); }


Meteor.publish('movies', function(searchText) {
  return Movies.find(queryBuilder(searchText), {fields: {
    ranking: 1,
    title: 1,
    rating: 1
  }});
});


Meteor.methods({
  getCount(searchText) {
    return Movies.find(queryBuilder(searchText)).count();
  }
});
