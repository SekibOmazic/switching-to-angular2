var reducer = function (total, current) {
  return total + current;
};

var result = [1, 2, 3].reduce(reducer, 0);

// 6
console.log(result);