package vnotebook

import grails.rest.RestfulController

class UserController extends RestfulController {
    static responseFormats = ['json']

    UserController() {
        super(Role, false)
    }
}
