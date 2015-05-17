package vnotebook

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_USER'])
class LibraryController extends RestfulControllerBase {
    static responseFormats = ['json']
    static allowedFields = ['name']
    def springSecurityService

    LibraryController() {
        super(Library, false)
    }

    @Override
    protected query() {
        def userId = springSecurityService.loadCurrentUser().id
        return Library.where {
            owner.id == userId
        }
    }

    @Override
    protected def getObjectToBind() {
        def result = request.JSON.subMap(allowedFields)
        result['owner'] = springSecurityService.loadCurrentUser()
        return result
    }
}
