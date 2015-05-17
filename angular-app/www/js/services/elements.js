application.factory('Elements', function($http, apiUrl) {
    return {
        getLibraries: function() {
          return $http.get(apiUrl + "/libraries");
        },
        notebooks : [
            {
                id: 0,
                title: "Cuaderno 0"
            },
            {
                id: 1,
                title: "Cuaderno 1"
            },
            {
                id: 2,
                title: "Cuaderno 2"
            },
            {
                id: 3,
                title: "Cuaderno 3"
            }
        ],
        getLibraryById: function (id) {
          return $http.get(apiUrl + "/libraries/" + id);
        },
        getNotebookById : function (id) {
            for(var i = 0; i < this.notebooks.length; ++i) {
                if(this.notebooks[i].id == id) {
                    return this.notebooks[i];
                }
            }
        }
    };
});
