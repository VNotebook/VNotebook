package vnotebook

import grails.rest.RestfulController

class WidgetController extends RestfulController {
    static responseFormats = ['json']

    WidgetController() {
        super(Widget, false)
    }
}
