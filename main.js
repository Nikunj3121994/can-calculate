/*jshint browser:true, esnext:true */
"use strict";

// Load the dependencies
import $ from 'jquery';
import can from 'can';
import canCalculate  from "./components/can-calculate/canCalculate";

// Load the app layout
import layout from "./layout.stache!";

$('#main').html(layout());
