application.factory('Elements', function($http, apiUrl) {
  return {
    getLibraries: function() {
      return $http.get(apiUrl + "/libraries");
    },
    getEvents: function() {
      return $http.get(apiUrl + "/events");
    },
    getLibraryById: function (id) {
      return $http.get(apiUrl + "/libraries/" + id);
    },
    getNotebookById : function (id) {
      return $http.get(apiUrl + "/notebooks/" + id);
    }
  };
});
