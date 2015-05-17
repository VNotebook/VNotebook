package vnotebook

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

@Secured(['ROLE_ADMIN'])
class UserController extends RestfulController {
    static responseFormats = ['json']

    UserController() {
        super(User, false)
    }

    @Override
    @Secured(['permitAll'])
    def save() {
        return super.save()
    }
}
