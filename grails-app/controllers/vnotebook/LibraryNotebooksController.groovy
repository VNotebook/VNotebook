package vnotebook

import grails.plugin.springsecurity.annotation.Secured
import org.springframework.http.HttpStatus

@Secured(['ROLE_USER'])
class LibraryNotebooksController extends RestfulBaseController {
    def springSecurityService

    LibraryNotebooksController() {
        super(Notebook, true)
    }

    @Override
    def show() {
        respond "", [status: HttpStatus.NOT_FOUND]
    }

    @Override
    protected def query() {
        def userId = springSecurityService.loadCurrentUser().id
        def libraryId = params.libraryId
        return Notebook.where {
            owner.id == userId && library.id == libraryId
        }
    }
}