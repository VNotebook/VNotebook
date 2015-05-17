package vnotebook

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import org.hibernate.FetchMode

@Secured(['ROLE_USER'])
class LibraryController extends RestfulControllerBase {
    static responseFormats = ['json']
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
    protected queryForResource(Serializable targetId) {
        def result = querySingle(targetId).withPopulatedQuery(null, null) { query ->
            query.@criteria.setFetchMode('reference', FetchMode.SELECT)
            return query.list()
        }.find()

        return JSON.use("details") {
            result as JSON
        }
    }

    @Override
    protected def getObjectToBind() {
        def result = request.JSON.subMap(allowedFields)
        result['owner'] = springSecurityService.loadCurrentUser()
        return result
    }
}
