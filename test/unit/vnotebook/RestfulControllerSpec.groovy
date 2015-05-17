package vnotebook

import org.codehaus.groovy.grails.web.json.JSONObject

import static org.springframework.http.HttpStatus.*
import grails.converters.JSON
import spock.lang.*
import vnotebook.config.Marshallers

abstract class RestfulControllerSpec extends Specification {
    def model

    // Extension points

    /**
     * Populates the given Map with the values to be sent to the save method in the request
     */
    abstract def populateValidParams(params)

    /**
     * Generates and returns a list of the items to be in the database when performing an index() request.
     * When overriding this, you are not expected to call save() on each item. This class will take care
     * of that. You can, however, save any model instances these items depend on.
     * @return A list of the initial items
     */
    abstract def generateInitialItems()

    /**
     * Converts a model instance to a map. This is used when comparing with the Map filled by populateValidParams().
     * The default behavior serializes to JSON and takes the JSONObject (which implements Map) from it.
     * @param modelInstance The model instance to be converted
     * @return A map: the converted model instance
     */
    def modelToMap(modelInstance) {
        return new JSONObject((modelInstance as JSON).toString())
    }

    /**
     * Compares (via assertions) the Map filled by populateValidParams() with the converted model instance
     * (using modelToMap()). The default behavior compares only the subset of properties from the converted model
     * that are part of the request Map.
     * @param map The request map (filled by populateValidParams())
     * @param modelInstance The model instance to compare
     */
    void compareMapToModel(map, modelInstance) {
        assert modelToMap(modelInstance).intersect(map) == map
    }

    /**
     * Returns a model instance to be updated or deleted. You don't need to save() this instance.
     * The default behavior takes the first item from generateInitialItems()
     */
    def getItemToUpdateOrDelete() {
        return generateInitialItems()[0]
    }

    /**
     * Populates the given Map with the values to be sent to the update() method.
     * By default, it uses populateValidParams().
     * You don't need to fill the id key (it will be filled automatically)
     */
    def populateUpdateParams(params) {
        populateValidParams(params)
    }

    // End extension points

    def setup() {
        new Marshallers().registerMarshallers()
    }

    void "Test the index action returns the correct model"() {
        def items = generateInitialItems()
        model.withTransaction {
            items.each({ it.save() })
        }

        when: "The model instances are added and the index action is executed"
        controller.index()

        then: "The response is correct and returns all data"
        response.status == OK.value()
        response.text == (items as JSON).toString()
    }

    void "Test the show action returns the correct model"() {
        def item = generateInitialItems()[0]
        item.save()
        def renderedJSON = JSON.use("details") {
            item as JSON
        }

        when: "The show method is executed"
        params.id = item.id
        controller.show()

        then: "The response is correct and returns all data"
        response.status == OK.value()
        response.text == renderedJSON.toString()
    }

    void "Test the save action correctly persists an instance"() {
        when: "The save action is executed with a valid instance"
        populateValidParams(params)
        request.json = (params as JSON).toString()
        request.method = 'POST'
        controller.save()

        def modelInstance = model.get(response.json['id'])

        then: "The response status is CREATED and the instance is returned"
        response.status == CREATED.value()
        response.text == (modelInstance as JSON).toString()
        compareMapToModel(params, modelInstance)
    }

    void "Test the update action correctly persists the new instance"() {
        def item = getItemToUpdateOrDelete()
        item.save(flush: true)

        when: "A PUT request is done"
        populateUpdateParams(params)
        params['id'] = item.id
        request.json = (params as JSON).toString()
        request.method = 'PUT'
        controller.update()

        def modelInstance = model.get(item.id)

        then:
        response.status == OK.value()
        response.text == (modelInstance as JSON).toString()
        compareMapToModel(params, modelInstance)
    }

    void "Test the delete action correctly removes the given instance"() {
        def item = getItemToUpdateOrDelete()
        item.save(flush: true)

        when: "A PUT request is done"
        params['id'] = item.id
        request.method = 'DELETE'
        controller.delete()

        def modelInstance = model.get(item.id)

        then:
        response.status == NO_CONTENT.value()
        response.text == ""
        modelInstance == null
    }
}
