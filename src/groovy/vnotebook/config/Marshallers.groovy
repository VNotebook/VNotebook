package vnotebook.config

import grails.converters.JSON
import vnotebook.*

class Marshallers {

    @javax.annotation.PostConstruct
    void registerMarshallers() {
        JSON.registerObjectMarshaller(Library) { Library library ->
            return [
                    id: library.id,
                    name: library.name,
                    dateCreated: library.dateCreated
            ]
        }

        JSON.registerObjectMarshaller(Notebook) { Notebook notebook ->
            return [
                    id: notebook.id,
                    name: notebook.name,
                    libraryId: notebook.library.id
            ]
        }

        JSON.registerObjectMarshaller(Widget) { Widget widget ->
            return [
                    id: widget.id,
                    name: widget.name,
                    description: widget.description,
                    html: widget.html
            ]
        }

        JSON.createNamedConfig('details') {
            it.registerObjectMarshaller(Library) { Library library, JSON json ->
                return [
                        id: library.id,
                        name: library.name,
                        dateCreated: library.dateCreated,
                        notebooks: library.notebooks
                ]
            }
        }
    }
}