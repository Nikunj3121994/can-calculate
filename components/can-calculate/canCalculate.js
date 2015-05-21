/*jshint browser:true, esnext:true */
"use strict";

import can from 'can';
import './calculator.css!';
import template from './template.stache!';

export default can.Component.extend({

	tag: 'can-calculate',

	template: template,

	viewModel: {

		currentValue: 0,

		/**
		*
		*/
		numberButtonClicked: function(context, el, ev) {
			console.log(el);
			this.attr('currentValue', el.attr('value'));
		},


	},

	events: {


	},

});
