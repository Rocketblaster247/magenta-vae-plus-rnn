var formatText = function (text) {
  text = text.toString();
  var indexes = text.split(";");
  var names = indexes[0].toString().split(";");
  var data = [];
  for (var i = 1; i < indexes.length; i ++) {
    data[i] = {};
    for (var e = 0; e < indexes[i].toString().split("::"); e ++) {
      data[i][names[e]] = indexes[i].toString().split("::")[e];
    }
  }
  return data;
};
