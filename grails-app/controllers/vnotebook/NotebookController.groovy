package vnotebook

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_USER'])
class NotebookController extends RestfulBaseController {
    static allowedFields = ['name']
    def springSecurityService

    NotebookController() {
        super(Notebook, false)
    }

    @Override
    protected query() {
        def userId = springSecurityService.loadCurrentUser().id
        return Notebook.where {
            owner.id == userId
        }
    }

    @Override
    protected def getObjectToBind() {
        def result = request.JSON.subMap(allowedFields)
        def user = springSecurityService.loadCurrentUser()
        result['owner'] = user
        result['library'] = Library.where {
            id == params.libraryId && owner.id == user.id
        }.find()
        return result
    }
}
