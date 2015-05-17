package vnotebook

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_USER'])
class LibraryController extends RestfulControllerBase {
    static responseFormats = ['json']
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
}
