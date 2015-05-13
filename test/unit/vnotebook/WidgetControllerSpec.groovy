package vnotebook

import grails.test.mixin.*

@TestFor(WidgetController)
@Mock(Widget)
class WidgetControllerSpec extends RestfulControllerSpec {
    def setup() {
        this.model = Widget
    }

    def populateValidParams(params) {
        assert params != null
        params['name'] = 'widget name'
        params['description'] = 'asdfghj'
        params['html'] = '<b>great</b>'
    }

    def generateInitialItems() {
        return [new Widget(name: 'Widget 1', description: 'Description 1', html: '<b>html 1</b>'),
                new Widget(name: 'Widget 2', description: 'Description 2', html: '<i>html 2</i>')]
    }
}
