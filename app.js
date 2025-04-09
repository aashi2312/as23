(function () {
    'use strict';
  
    angular.module('LunchCheck', [])
      .controller('LunchCheckController', LunchCheckController);
  
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
      $scope.lunchItems = "";
      $scope.message = "";
      $scope.messageClass = "";
      $scope.borderClass = "";
  
      $scope.checkLunch = function () {
        if (!$scope.lunchItems || $scope.lunchItems.trim() === "") {
          $scope.message = "Please enter data first";
          $scope.messageClass = "red";
          $scope.borderClass = "red";
          return;
        }
  
        var items = $scope.lunchItems.split(',')
          .map(item => item.trim())
          .filter(item => item !== ""); // removes empty items
  
        if (items.length === 0) {
          $scope.message = "Please enter data first";
          $scope.messageClass = "red";
          $scope.borderClass = "red";
        } else if (items.length <= 3) {
          $scope.message = "Enjoy!";
          $scope.messageClass = "green";
          $scope.borderClass = "green";
        } else {
          $scope.message = "Too much!";
          $scope.messageClass = "green";
          $scope.borderClass = "green";
        }
      };
    }
  })();
  