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
        return query().where({id == targetId}).get()
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
