Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready!');
});

Pebble.addEventListener('showConfiguration', function() {
  var url = 'http://pebble.wizguild.com/maurice/';
  console.log('Showing configuration page: ' + url);

  Pebble.openURL(url);
});

function XhexToRgb(hex) {
    var result = /^#?(?:0x)?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/i.exec(hex);
    if (result && result.length == 4) {
        return parseInt(result[1], 16)*65536+
               parseInt(result[2], 16)*256+
               parseInt(result[3], 16);
    } else {
        console.log('"'+hex+'" is not a hex colour');
        console.log(result);
    }
}

Pebble.addEventListener('webviewclosed', function(e) {
  var configData = JSON.parse(decodeURIComponent(e.response));
  console.log('Configuration page returned: ' + JSON.stringify(configData));

  dict = {
    backgroundColor: XhexToRgb(configData.backgroundColor),
    hourColor: XhexToRgb(configData.hourColor),
    hourinColor: XhexToRgb(configData.hourinColor),
    minuteColor: XhexToRgb(configData.minuteColor),
    textColor: XhexToRgb(configData.textColor)
    };
  // Send to watchapp
  Pebble.sendAppMessage(dict, function() {
    console.log('Send successful: ' + JSON.stringify(dict));
  }, function() {
    console.log('Send failed!');
  });
});