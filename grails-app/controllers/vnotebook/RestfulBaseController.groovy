package vnotebook

import grails.converters.JSON
import grails.rest.RestfulController
import grails.transaction.Transactional


abstract class RestfulBaseController extends RestfulController {
    static responseFormats = ['json']

    RestfulBaseController(Class resource) {
        super(resource)
    }

    RestfulBaseController(Class resource, boolean readOnly) {
        super(resource, readOnly)
    }

    @Override
    Object index(Integer max) {
        return super.index(max)
    }

    @Override
    def show() {
        JSON.use("details", {
            super.show()
        })
    }

    @Override
    def patch() {
        JSON.use("details", {
            super.patch()
        })
    }

    @Override
    def update() {
        JSON.use("details", {
            super.update()
        })
    }

    @Override
    def delete() {
        JSON.use("details", {
            super.delete()
        })
    }

    @Override
    def save() {
        JSON.use("details", {
            super.save()
        })
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
        return querySingle(targetId).find()
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
