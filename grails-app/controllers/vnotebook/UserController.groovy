package vnotebook

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

@Secured(['ROLE_ADMIN'])
class UserController extends RestfulBaseController {
    static allowedFields = ['username', 'password', 'firstName', 'lastName', 'email']

    UserController() {
        super(User, false)
    }

    @Override
    @Secured(['permitAll'])
    def save() {
        return super.save()
    }

    @Override
    protected def getObjectToBind() {
        return request.JSON.subMap(allowedFields)
    }
}
