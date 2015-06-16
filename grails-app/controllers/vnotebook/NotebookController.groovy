package vnotebook

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_USER'])
class NotebookController extends RestfulBaseController {
    static allowedFields = ['name', 'libraryId']
    def springSecurityService

    NotebookController() {
        super(Notebook, false)
    }

    @Override
    protected def query() {
        def user = springSecurityService.loadCurrentUser()
        return Notebook.where {
            owner == user
        }
    }

    @Override
    protected def getObjectToBind() {
        def result = request.JSON.subMap(allowedFields)
        def user = springSecurityService.loadCurrentUser()
        result['owner'] = user
        result['library'] = Library.where {
            id == result.libraryId && owner == user
        }.find()
        return result
    }
}
