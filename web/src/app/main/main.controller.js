'use strict';

angular.module('web')
  .controller('MainCtrl', function($http) {
    var self = this;
    self.currentUser = {};
    self.username = "chris-ramon";
    var GithubAPI = "https://api.github.com";
    this.onSubmit = function() {
      $http({
        method: "GET",
        url: GithubAPI + "/users/" + self.username,
      }).then(onGetUser);
    };
    function onGetUser(r) {
      self.currentUser.user = r.data;
      $http({
        method: "GET",
        url: GithubAPI + "/users/" + self.username  + "/followers"
      }).then(onGetUserFollowers);
    }
    function onGetUserFollowers(r) {
      self.currentUser.followers = r.data;
    }
  })
  .directive("followersGraph", function(Renderer) {
    return {
      restrict: "E",
      scope: {followers: "=", currentUser: "="},
      template: "<div id='graphContainer'></div>",
      link: function(scope) {
        scope.$watch("followers", function(followers) {
          if(followers)
            Renderer.render(scope.currentUser, followers);
        });
      }
    };
  });
