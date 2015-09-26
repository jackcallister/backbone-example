import $ from 'jquery'
import Backbone from 'backbone'
import _ from 'underscore'


const Todo = Backbone.Model.extend({

  defaults: {
    id: 1,
    text: 'Get stuff done',
    completed: false
  },

  toggle: function() {
    this.set({
      completed: !this.get('completed')
    })
  }
})

const TodoView = Backbone.View.extend({

  // jQuery selecting from the DOM
  el: '#todo',

  events: {
    'click .toggle': 'toggle'
  },

  toggle: function() {
    this.model.toggle()
  },

  // Magic - underscores template returns a function
  // which accepts a JSON object to interpolate (in render)
  template: _.template($('#todo-template').html()),

  // Kick off a render on init
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
    this.render()
  },

  // Spit some JSON at the template
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
})

document.addEventListener('DOMContentLoaded', () => {
  new TodoView({
    model: new Todo
  })
})
