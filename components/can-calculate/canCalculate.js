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
							this.attr('calculationString', calculationArray.join(' '));
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
				calculationArray.push(parseInt(el.attr('value')));
			} else if (!isNaN(previousInput)) {
				calculationArray[calculationArray.length - 1] = parseInt(calculationArray[calculationArray.length - 1].toString() + parseInt(el.attr('value')).toString());
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
				calculationArray.push("=");
				calculationArray.push(finishedCalculation);
			} else {
				// If calculationArray is NOT empty and previous input was an operation
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
				newNumber = parseInt(newNumber.substring(0, newNumber.length - 1));

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
