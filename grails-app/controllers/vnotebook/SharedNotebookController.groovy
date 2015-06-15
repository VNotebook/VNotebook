package vnotebook

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_USER'])
class SharedNotebookController extends RestfulBaseController {
    def springSecurityService

    SharedNotebookController() {
        super(Notebook, true)
    }

    @Override
    protected def query() {
        def user = springSecurityService.loadCurrentUser()

        return Notebook.where {
            shares.sharedWith == user
        }
    }
}
