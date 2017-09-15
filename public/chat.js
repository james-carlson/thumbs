// Make connection 
var socket = io.connect('http://localhost:4000')

// Query DOM
var message = document.getElementById('message')
var handle = document.getElementById('handle')
var btn = document.getElementById('send')
var output = document.getElementById('output')
// var up = document.getElementById('thumbsup')
// var sideways = document.getElementById('middlethumbs')
// var down = document.getElementById('thumbsdown')

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

// Listen for events
socket.on('chat', function(data) {
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

// var opts = {
//     angle: -0.2, // The span of the gauge arc
//     lineWidth: 0.2, // The line thickness
//     radiusScale: 1, // Relative radius
//     pointer: {
//       length: 0.6, // // Relative to gauge radius
//       strokeWidth: 0.035, // The thickness
//       color: '#000000' // Fill color
//     },
//     limitMax: false,     // If false, max value increases automatically if value > maxValue
//     limitMin: false,     // If true, the min value of the gauge will be fixed
//     colorStart: '#6F6EA0',   // Colors
//     colorStop: '#C0C0DB',    // just experiment with them
//     strokeColor: '#EEEEEE',  // to see which ones work best for you
//     generateGradient: true,
//     highDpiSupport: true     // High resolution support
//   };
//   var target = document.getElementById('foo'); // your canvas element
//   var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
//   gauge.maxValue = 3000; // set max gauge value
//   gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
//   gauge.animationSpeed = 32; // set animation speed (32 is default value)
//   gauge.set(0); // set actual value
//   var target = document.getElementById('foo'); // your canvas element
//   var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
//   gauge.maxValue = ; // set max gauge value
//   gauge.setMinValue(0);  // set min value
//   gauge.set(1250); // set actual value