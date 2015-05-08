(function() {
  "use strict";
  function Renderer() {
    var self = this;
    self.render = function(currentUser, data) {
      var graph = Viva.Graph.graph();
      var data_length = data.length;
      // Construct the graph
      graph.addNode(currentUser.user.name, {url : currentUser.user.avatar_url});
      for (var i=0; i < data_length; i++) {
        var name = data[i].login,
          avatar_url = data[i].avatar_url;
        graph.addNode(name, {url : avatar_url});
        graph.addLink(currentUser.user.name, name);
      }
      // Set custom nodes appearance
      var graphics = Viva.Graph.View.svgGraphics();
      graphics.node(function(node) {
             // The function is called every time renderer needs a ui to display node
             return Viva.Graph.svg('image')
                   .attr('width', 24)
                   .attr('height', 24)
                   .link(node.data.url); // node.data holds custom object passed to graph.addNode();
          })
          .placeNode(function(nodeUI, pos){
              // Shift image to let links go to the center:
              nodeUI.attr('x', pos.x - 12).attr('y', pos.y - 12);
          });
      var renderer = Viva.Graph.View.renderer(graph, {graphics : graphics, container : document.getElementById('graphContainer')});
      renderer.run();
    };
  }
  angular.module('web').service("Renderer", Renderer);
})();

