(function () {
    'use strict';
  
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);
  
    function FoundItemsDirective() {
      return {
        restrict: 'E',
        templateUrl: 'foundItems.html',
        scope: {
          items: '<',
          onRemove: '&'
        }
      };
    }
  
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var narrow = this;
  
      narrow.narrowItDown = function () {
        if (!narrow.searchTerm) {
          narrow.found = [];
          narrow.nothingFound = true;
          return;
        }
  
        MenuSearchService.getMatchedMenuItems(narrow.searchTerm).then(function (foundItems) {
          narrow.found = foundItems;
          narrow.nothingFound = foundItems.length === 0;
        });
      };
  
      narrow.removeItem = function (index) {
        narrow.found.splice(index, 1);
      };
    }
  
    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
      var service = this;
  
      service.getMatchedMenuItems = function (searchTerm) {
        return $http({
          method: 'GET',
          url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
        }).then(function (response) {
          var foundItems = [];
          var items = response.data.menu_items;
  
          for (var i = 0; i < items.length; i++) {
            if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
              foundItems.push(items[i]);
            }
          }
  
          return foundItems;
        });
      };
    }
  
  })();
  