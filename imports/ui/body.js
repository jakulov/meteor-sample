import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating';
 import { ReactiveDict } from 'meteor/reactive-dict';
 import { Books } from '../api/books.js';
 
import './book.js';
 import './body.html';
 
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});


 Template.body.helpers({
   books() {
     


const instance = Template.instance();
   if (instance.state.get('hideCompleted')) {
      return Books.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
     return Books.find({}, { sort: { createdAt: -1 } });
   },
 });
 
 Template.body.events({
   'submit .new-book'(event) {
     event.preventDefault();
     var target = event.target;
     var text = target.avt.value;
     var textt = target.naz.value;
     var txt = target.izd.value;
      Books.insert({
       text, textt, txt,
       createdAt: new Date()

     });
     target.avt.value = '';
     target.naz.value = '';
     target.izd.value = '';   
   },

  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
 });
