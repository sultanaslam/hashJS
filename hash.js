// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between the
// numbers 0 and `max`
var getIndexForKey = function(str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

///////////////////////////////////////////////////////////////

var HashTable = function() {
  this.limit = 8;
  this.storage = [];
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexForKey(k, this.limit);

  if(!this.storage[index]) { // the location is empty [empty, ......]
    this.storage[index] = []; //[[]. .....]
    this.storage[index].push([k,v]) //[[[k,v]],.....]

  } else { // location is not empty, means collision
    for(var i = 0; i < this.storage[index].length; i++) { // iterate over the array in the selected location
      if(k === this.storage[index][i][0]){ // if the key is already there
        this.storage[index][i][1] = v; // replace the value with new value
        return; 
      }
    }
    this.storage[index].push([k,v]); // if collisin but unique key then add it to the location array
  }
};

HashTable.prototype.retrieve = function(k) {
 var index = getIndexForKey(k, this.limit);

    for (var i = 0; i < this._storage[index].length; i++){
      if (k === this.storage[index][i][0]) {
        return this.storage[index][i][1];
      }
    }
    return undefined;
};

HashTable.prototype.remove = function(k) {
  var index = getIndexForKey(k, this.limit);
  var bucket = this.storage[index];
  if (bucket) {
    for (var i = 0; i < bucket.length; i++) {
      if (k === bucket[i][0]) {
        bucket.splice(i, 1);
        if(!bucket.length) {
          delete this.storage[index];
        }
      }
    }
  }
};