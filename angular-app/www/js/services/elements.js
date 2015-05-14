application.factory('Elements', function() {
    return {
        libraries : [
            {
                id: 0,
                title: "Biblioteca 1",
                notebooks: [0, 1]
            },
            {
                id: 1,
                title: "Biblioteca 2",
                notebooks: [2, 3]
            }
        ],
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
        getLibraryById : function (id) {
            for(var i = 0; i < this.libraries.length; ++i) {
                if(this.libraries[i].id == id) {
                    return this.libraries[i];
                }
            }
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
