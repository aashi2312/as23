(function () {
    'use strict';
  
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var buy = this;
  
      buy.items = ShoppingListCheckOffService.getToBuyItems();
  
      buy.buyItem = function (itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
      };
    }
  
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var bought = this;
  
      bought.items = ShoppingListCheckOffService.getBoughtItems();
    }
  
    function ShoppingListCheckOffService() {
      var service = this;
  
      var toBuyItems = [
        { name: "Apples", quantity: 5 },
        { name: "Bananas", quantity: 6 },
        { name: "Cookies", quantity: 10 },
        { name: "Chips", quantity: 3 },
        { name: "Milk", quantity: 2 }
      ];
  
      var boughtItems = [];
  
      service.buyItem = function (itemIndex) {
        var item = toBuyItems.splice(itemIndex, 1)[0];
        boughtItems.push(item);
      };
  
      service.getToBuyItems = function () {
        return toBuyItems;
      };
  
      service.getBoughtItems = function () {
        return boughtItems;
      };
    }
  
  })();
  