package vnotebook

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

    @Override
    protected Object queryForResource(Serializable targetId) {
        // We have to use build() because chaining where() doesn't work here (GORM bug)
        return query().build({eq 'id', targetId}).get()
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
