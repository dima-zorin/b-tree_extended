window.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  var w = window.innerWidth;
  var h = window.innerHeight;
  myCanvas.width = w;
  myCanvas.height = h;

  h = h - h;

  var data = ['aa', ['ab', 'ac'], 'ad', 'ae', 'af', ['ag', 'ah'], 'ai', 'aj', 'ak'];
  var node1 = [], node2 = [], node3 = [], node4 = [], node5 = [], node6 = [], node7 = [];

  function dataReady() {
    function condition(value, index, array) {
      var result = false;
      if (Array.isArray(data[index]) === true) {
        result = true;
        data.splice(index, 1);
      }
      return result;
    }
    var filteredData = data.filter(condition);

    for (var v = 0; v < filteredData.length; v++) {
      for (var a = 0; a < filteredData[v].length; a++) {
        data.push(filteredData[v][a]);
      }
    }

    data.sort();
  }

  dataReady();

  var nodeWidth = 100;
  var nodeHeight = 60;
  var drop = nodeHeight / 2;
  var startPoint = [];
  var evalCounter = 2;
  var levels = 2;

  function slice() {
    node1.push(data[5]);
    node2.push(data[2]);
    node3.push(data[8]);
    node4.push(data[0], data[1]);
    node5.push(data[3], data[4]);
    node6.push(data[6], data[7]);
    node7.push(data[9], data[10]);
  }

  slice();

  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = 5;

  var trunkRect = {
    x: w / 2,
    y: h + 50
  };
  startPoint.push(trunkRect);

  ctx.font = "bold 20px Arial";
  ctx.fillText(node1, trunkRect.x + drop / 2, trunkRect.y + drop * 5 / 4);
  ctx.strokeRect(trunkRect.x, trunkRect.y, nodeWidth, nodeHeight);

  function branchRect() {
    
    var newStartPoint = [];
    var newNewStartPoint = [];
    for (var i = 0; i < startPoint.length; i++) {
      var sp = startPoint[i];

      var nspl = {
        x: sp.x - nodeWidth * 4 / (startPoint.length * 2),
        y: sp.y + nodeHeight + drop
      };
      var nspr = {
        x: sp.x + nodeWidth * 4 / (startPoint.length * 2),
        y: sp.y + nodeHeight + drop
      };

      ctx.strokeRect(nspl.x, nspl.y, nodeWidth, nodeHeight);
      ctx.strokeRect(nspr.x, nspr.y, nodeWidth, nodeHeight);
      
      ctx.fillText(eval('node'+evalCounter).join("  "), nspl.x + drop / 2, nspl.y+ drop * 5 / 4);
      ctx.fillText(eval('node'+(evalCounter+1)).join("  "), nspr.x + drop / 2, nspr.y+ drop * 5 / 4);

      ctx.beginPath();
      ctx.moveTo(sp.x, sp.y + nodeHeight / 2);
      ctx.lineTo(nspl.x + nodeWidth / 2, nspr.y);
      ctx.moveTo(sp.x + nodeWidth, sp.y + nodeHeight / 2);
      ctx.lineTo(nspr.x + nodeWidth / 2, nspr.y);
      ctx.stroke();

      newStartPoint.push(nspl);
      newStartPoint.push(nspr);
      evalCounter = evalCounter+2;
    }

    startPoint = newStartPoint;
  }

  for (var n = 0; n < levels; n++) {
    branchRect();
  }
};