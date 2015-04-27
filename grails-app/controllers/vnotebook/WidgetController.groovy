package vnotebook

import grails.rest.RestfulController

class WidgetController extends RestfulController {
    static responseFormats = ['json', 'xml']

    WidgetController() {
        super(Widget, false)
    }
}
