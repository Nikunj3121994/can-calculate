/*jshint browser:true, esnext:true */
"use strict";

import can from 'can';
import define from 'can/map/define/define';
import './calculator.css!';
import template from './template.stache!';

export default can.Component.extend({

	tag: 'can-calculate',

	template: template,

	viewModel: {

		define: {
			calculation: {

	      set: function(newVal){
					console.log(this.calculation);
					this.attr('calculationString', this.calculation.join(' '));
	      },

				/*
	      get: function (newVal) {
					console.log(newVal);
					return this.attr('calculation');
	      }
				*/


	    }

		},


		calculationString: "",

		calculation: [],

		/**
		*
		*/
		numberButtonClicked: function(context, el, ev) {
			var newValue = this.calculation.push(el.attr('value'));
			this.attr('calculation', newValue);
		},

		/**
		*
		*/
		operationButtonClicked: function(context, el, ev) {

			var newValue = this.calculation.push(el.attr('value'));
			this.attr('calculation', newValue);

			if (el.attr('value') === "=") {
					var endCalculation = 0;
					this.calculation.forEach((val, index, arr) => {
						if (!isNaN(val)) {
							endCalculation = endCalculation + val;
						}
					});
					var newValue = this.calculation.push(endCalculation);
					this.attr('calculation', newValue);
			}


		},

		/**
		*
		*/
		eraseButtonClicked: function(context, el, ev) {
			var newValue = this.calculation.pop();
			this.attr('calculation', newValue);
		},

		/**
		*
		*/
		clearButtonClicked: function(context, el, ev) {;
			this.attr('calculation', null);
		},

	},

	events: {


	},

});
