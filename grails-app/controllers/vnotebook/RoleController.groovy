package vnotebook

import grails.rest.RestfulController

class RoleController extends RestfulController {
    static responseFormats = ['json']

    RoleController() {
        super(Role, false)
    }
}
