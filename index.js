// precomputation with currying
var isWord = function(words) {
  var wordTable = words;
  return function(word) { // return a function waiting for execution
    if (wordTable.indexOf(word) == -1) {
      return false;
    } else {
      return true;
    }
  };
};

// we precompute the list of words and return a function waiting for execution.
var isCapital = isWord(["London", "Paris", "Warsaw", "Tokyo"]);
console.log(isCapital("Paris")); // true
console.log(isCapital("Denver")); // false

// precomputation with currying, but we're evaluating the list of words each time, what if this list is millions of records?
var isCapitalSlow = function (word) {
  return isWord(["London", "Paris", "Warsaw", "Tokyo"])(word); // eval the list and execute the function right away
};

console.log(isCapitalSlow("Paris")); // true
console.log(isCapitalSlow("Denver")); // false


// precomputation with meomization
// precomputation is one important way to amortize the costs of computation in F#.  Another is called memoization.
// A memozing function avoids recomputating its reults by keeping an internal table, often called a looked aside table.
var fibonacciFast = function(n) {
  var lookasideTable = {};
  var fibonacciCached = function(n) {
    if (lookasideTable.hasOwnProperty(n)) {
      return lookasideTable[n];
    } else if (n <= 2) {
      return 1;
    } else {
      var result = fibonacciCached(n - 1) + fibonacciCached(n - 2);
      lookasideTable[n] = result;

      return result;
    }
  };

  return fibonacciCached(n);
};

console.time("100");
console.log(fibonacciFast(100)); // 40ms, after the first run though you actual cache will hold the value and lower the execution time.
console.timeEnd("100");

console.time("100fast");
console.log(fibonacciFast(100)); // 0ms
console.timeEnd("100fast");

// composition
var compose = function(f, g) {
  return function(x) {
    return f(g(x));
  };
};

var toUpperCase = function(x) {
  return x.toUpperCase();
};

var exclaim = function(x) {
  return x + '!';
};

var shout = compose(exclaim, toUpperCase);

console.log(shout("hey you guys"));
