import React, { Component } from 'react';
import {Gauge} from 'gaugeJS';
import thumbs from '../Landing/thumbs.svg';

var opts = {
    angle: 0.15, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: .86, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: '#25AAE1' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#25AAE1',   // Colors
    colorStop: '#F2F2F2',    // just experiment with them
    strokeColor: '#F2F2F2',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    staticLabels: {
        font: "1rem Hind",  // Specifies font
        labels: [1,2,3,4,5],  // Print labels at these values
        color: "#000000",  // Optional: Label text color
        fractionDigits: 0  // Optional: Numerical precision. 0=round off.
      },
    // pointer: {
    //     // Extra optional pointer options:
    //     iconPath: 'myicon.png',  // Icon image source
    //     iconScale: 1,    // Size scaling factor
    //     iconAngle: 90.0  // Rotation offset angle, degrees
    //   },
  };

export default class GaugeDisplay extends Component {

    componentWillReceiveProps(nextProps){
        this.gauge.set(nextProps.avg || 1)
    }
    
    componentDidMount(){
        var target = document.getElementById(`canvas${this.props.id}`); // your canvas element
        this.gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
        this.gauge.maxValue = 5; // set max gauge value
        this.gauge.setMinValue(1);  // Prefer setter over gauge.minValue = 0
        this.gauge.animationSpeed = 32; // set animation speed (32 is default value)
        this.gauge.set(1); // set actual value
        
    }

    render () {

        return (
            <canvas id={`canvas${this.props.id}`}>
                this is my canvas
                </canvas>
            
        );
    }
}