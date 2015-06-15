package vnotebook

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_USER'])
class NotebookSharesController extends RestfulBaseController {
    static allowedFields = ['username']
    def springSecurityService

    NotebookSharesController() {
        super(NotebookShare, false)
    }

    @Override
    protected def query() {
        def currentUser = springSecurityService.loadCurrentUser()
        def notebookId = params.notebookId
        return NotebookShare.where {
            notebook.id == notebookId && notebook.owner == currentUser
        }
    }

    @Override
    protected def getObjectToBind() {
        def source = request.JSON.subMap(allowedFields)

        def result = []

        def user = springSecurityService.loadCurrentUser()
        def userId = user.id
        def notebookId = params.notebookId

        result['notebook'] = Notebook.where {
            id == notebookId && owner == user
        }.find()

        def targetUsername = source.username
        result['sharedWith'] = User.where {
            username == targetUsername && id != userId
        }

        return result
    }
}
