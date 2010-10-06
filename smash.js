var fs = require('fs'),
    sys = require('sys');
    
var flags = process.argv,
    len = flags.length,
    cssDir = flags[2],
    combine = false;

// command line flags
for (var i = 0; i < len; i++) {
  switch (flags[i]) {
    // optional flag - combines all css into one file called main.min.css
    case '--combine':
      combine = true;
      break;
  }
}

// Reads the given directory and gets all files in it
fs.readdir(cssDir, function(err, files){
  if (err) throw err;
  
  var fileArray = files,
      len = fileArray.length,
      buffer = [],
      fileName = 'main.min.css';
  
  for (var i = 0; i < len; i++) {
    buffer.push(readParseFile(fileArray[i]));
    if (!combine) {
      var minName = fileArray[i].replace('css', 'min.css');
      writeToFile(minName, buffer); 
    } else if (combine && (i == len - 1)) {
      writeToFile(fileName, buffer);
    } 
  }

  // writes the buffer string to the appropriate file
  function writeToFile(name, content) {
    fs.writeFile(cssDir + name, content.join(''), function(err) {
      if (err) throw err;
      sys.print(name + ' was successfully written!');
    });
  }
  
});

// Reads a file and grabs its contents
function readParseFile(name) {
  return parseFile(fs.readFileSync(cssDir + name));
}

// parses file and runs state machine to remove white space
function parseFile (data) {
  var self = this;
  this.state = 'selector';
  this.stateWas = '';
  self.content = data.toString();
  var len = self.content.length,
      buffer = '';
  
  /* values for state variable:
   * selector
   * properties
   * property
   * value
   * comment
   */
  
  for (var i = 0; i < len; i++) {
    // Helpers
    var bit = {
      curr: self.content[peek(i, 0)],
      prev: self.content[peek(i, -1)],
      next: self.content[peek(i, 1)],
      nth: function (n) {return self.content[peek(i, n)];} 
    }
    
    if (bit.curr == '/' && bit.next == '*') {
      self.stateWas = self.state;
      self.state = 'comment';
    }
    
    switch (self.state) {
      case 'selector':
        if (bit.curr !== '\n' && bit.next !== '{' && bit.next !== '\t' && bit.curr !== ' ') {
          buffer += bit.curr;
        }
        if (bit.curr == '{') {
          self.state = 'properties';
        }
        break;
      case 'properties':
        if (bit.curr !== '\n' && bit.curr !== '\t' && bit.curr !== ' ') {
          buffer += bit.curr;
        }
        
        if (bit.curr == ':') {
          self.state = 'property';
        } else if (bit.curr == '}') {
          self.state = 'selector';
        }
        
        break;
      case 'property':
        if (!(bit.prev == ':' && bit.curr == ' ') && bit.prev !== ',') {
          buffer += bit.curr;
        }
        
        if (bit.curr == ';') {
          self.state = 'properties';
        }
        
        break;
      case 'comment':
        if (bit.prev == '*' && bit.curr == '/') {
          self.state = self.stateWas;
        }
        break;
    }
  }
  return buffer;
}

// helper function to peek ahead, behind, or at the 
// current value of the buffer
function peek (i, num) {
  return i + num;
}
