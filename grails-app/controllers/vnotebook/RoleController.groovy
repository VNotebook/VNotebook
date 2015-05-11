package vnotebook

import grails.rest.RestfulController

class RoleController extends RestfulController {
    static responseFormats = ['json', 'xml']

    RoleController() {
        super(Role, false)
    }
}
