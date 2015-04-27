package vnotebook


import static org.springframework.http.HttpStatus.*
import grails.converters.JSON
import grails.test.mixin.*
import spock.lang.*

@TestFor(WidgetController)
@Mock(Widget)
class WidgetControllerSpec extends Specification {

    def populateValidParams(params) {
        assert params != null
        params['name'] = 'widget name'
        params['description'] = 'asdfghj'
        params['html'] = '<b>great</b>'
    }

    void "Test the index action returns the correct model"() {

        when: "The index action is executed"
        controller.index()

        then: "The response is correct"
        response.status == OK.value
        response.text == ([] as JSON).toString()
    }

    void "Test the save action correctly persists an instance"() {
        when: "The save action is executed with a valid instance"
        response.reset()
        populateValidParams(params)
        request.json = (params as JSON).toString()
        request.method = 'POST'
        controller.save()
        def widget = Widget.get(response.json['id'])

        then: "The response status is CREATED and the instance is returned"
        response.status == CREATED.value
        response.text == (widget as JSON).toString()
    }
}
