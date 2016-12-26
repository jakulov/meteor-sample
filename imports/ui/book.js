import { Template } from 'meteor/templating';

import { Session } from 'meteor/session';
 
import { Books } from '../api/books.js';
 
import './book.html';

Template.bookk.bookEdit = function(){
  // because the Session variable will most probably be undefined the first time
  return Session.get("bookEdit");
};

Session.set("bookEdit", false);

Template.bookk.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Books.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Books.remove(this._id);
  },
  'click .edit'() {
    Session.set('bookEdit', true);
  },
  'submit .edit-book'(event) {

    event.preventDefault();
    var target = event.target;
    var text = target.avt.value;
    var textt = target.naz.value;
    var txt = target.izd.value;

    Books.update(this._id, {
      $set: {
        text: text,
        textt: textt,
        txt: txt,
      }
    });

    Session.set('bookEdit', false);
  }
});

