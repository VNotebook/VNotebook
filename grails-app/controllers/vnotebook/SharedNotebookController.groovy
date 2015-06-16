package vnotebook

import grails.plugin.springsecurity.annotation.Secured
import org.hibernate.FetchMode

@Secured(['ROLE_USER'])
class SharedNotebookController extends RestfulBaseController {
    def springSecurityService

    SharedNotebookController() {
        super(Notebook, true)
        this.jsonConfig = "sharedNotebook"
        this.jsonDetailsConfig = "sharedNotebook"
    }

    @Override
    protected def query() {
        def user = springSecurityService.loadCurrentUser()

        return Notebook.where {
            shares.sharedWith == user
        }
    }

    @Override
    protected List listAllResources(Map params) {
        return query().withPopulatedQuery(null, null) { query ->
            query.@criteria.setFetchMode('owner', FetchMode.JOIN)
            query.@criteria.setFetchMode('notebook', FetchMode.JOIN)
            return query.list()
        }
    }
}
