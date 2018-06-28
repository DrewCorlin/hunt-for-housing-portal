import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import _ from  'underscore';
import $ from 'jquery';
Backbone.$ = $;
window.$ = $;
var App = Radio.channel('App');

export {_, $, Backbone, Marionette, App};