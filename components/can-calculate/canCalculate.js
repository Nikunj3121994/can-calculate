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
			calculationArray: {
				value: [],
	      set: function(){
					var calculationArray = this.attr('calculationArray');

					if (calculationArray !== undefined) {
							console.log(calculationArray);
							this.attr('calculationString', calculationArray.join(' '));
							console.log(this.attr('calculationString'));
					}
	      },
	    },
			calculationString: {
				value: ""
			}
		},


		/**
		*
		*/
		numberButtonClicked: function(context, el, ev) {
			var calculationArray = this.attr('calculationArray');
			var previousIndex = calculationArray.length - 1;
			var previousInput = calculationArray[previousIndex];

			// If calculationArray is empty or previous input was an operation
			if (previousInput === undefined || isNaN(previousInput)) {
				calculationArray.push(parseFloat(el.attr('value')));
			} else if (!isNaN(previousInput)) {
				if (el.attr('value') === ".") {
					calculationArray[calculationArray.length - 1] = calculationArray[calculationArray.length - 1].toString() + ".";
				} else {
					calculationArray[calculationArray.length - 1] = parseFloat(calculationArray[calculationArray.length - 1].toString() + parseFloat(el.attr('value')).toString());
				}
			}
			this.attr('calculationArray', calculationArray);
		},

		/**
		*
		*/
		operationButtonClicked: function(context, el, ev) {
			var calculationArray = this.attr('calculationArray');
			var previousIndex = calculationArray.length - 1;
			var previousInput = calculationArray[previousIndex];

			// Submit calculation
			if (el.attr('value') === "=") {
				var finishedCalculation = eval(calculationArray.join(' '));

				// Why the heck did I have to force the array clear like this?!
				// Must find out!
				this.attr('calculationArray', [finishedCalculation]);
				calculationArray = [finishedCalculation];
			} else {
				// If calculationArray is NOT empty and previous input was NOT an operation
				if (previousInput !== undefined && !isNaN(previousInput)) {
					calculationArray.push(el.attr('value'));
				}
			}
			this.attr('calculationArray', calculationArray);

		},

		/**
		*
		*/
		eraseButtonClicked: function(context, el, ev) {
			var calculationArray = this.attr('calculationArray');
			var previousIndex = calculationArray.length - 1;
			var previousInput = calculationArray[previousIndex];

			if (isNaN(previousInput)) {
				calculationArray.pop();
			} else {
				var newNumber = calculationArray[previousIndex].toString();
				newNumber = parseFloat(newNumber.substring(0, newNumber.length - 1));

				if (!isNaN(newNumber)) {
					calculationArray[previousIndex] = newNumber;
				} else {
					calculationArray.pop();
				}
			}
			this.attr('calculationArray', calculationArray);
		},

		/**
		*
		*/
		clearButtonClicked: function(context, el, ev) {
			this.attr('calculationArray', []);
			this.attr('calculationString', "");
		},

	},

	events: {


	},

});
