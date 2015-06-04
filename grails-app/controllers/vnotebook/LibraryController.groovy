package vnotebook

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import org.hibernate.FetchMode

@Secured(['ROLE_USER'])
class LibraryController extends RestfulBaseController {
    static allowedFields = ['name']
    def springSecurityService

    LibraryController() {
        super(Library, false)
    }

    @Override
    protected def query() {
        def userId = springSecurityService.loadCurrentUser().id
        return Library.where {
            owner.id == userId
        }
    }

    @Override
    protected def querySingle(Serializable targetId) {
        return super.querySingle(targetId).withPopulatedQuery(null, null) { query ->
            query.@criteria.setFetchMode('notebooks', FetchMode.SELECT)
            return query.list()
        }
    }

    @Override
    protected def getObjectToBind() {
        def result = request.JSON.subMap(allowedFields)
        result['owner'] = springSecurityService.loadCurrentUser()
        return result
    }
}
