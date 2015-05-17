package vnotebook

import grails.converters.JSON
import grails.rest.RestfulController


class RestfulControllerBase extends RestfulController {
    RestfulControllerBase(Class resource) {
        super(resource)
    }

    RestfulControllerBase(Class resource, boolean readOnly) {
        super(resource, readOnly)
    }

    RestfulControllerBase() {
        super()
    }

    protected def query() {
        return resource
    }

    protected def querySingle(Serializable targetId) {
        // We have to use build() because chaining where() doesn't work here (GORM bug)
        return query().build({eq 'id', targetId})
    }

    @Override
    protected def queryForResource(Serializable targetId) {
        return JSON.use("details") {
            querySingle().get() as JSON
        }
    }

    @Override
    protected List listAllResources(Map params) {
        return query().list(params)
    }

    @Override
    protected Integer countResources() {
        return query().count()
    }
}
