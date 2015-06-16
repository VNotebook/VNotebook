package vnotebook

import grails.converters.JSON
import grails.rest.RestfulController
import grails.transaction.Transactional


abstract class RestfulBaseController extends RestfulController {
    static responseFormats = ['json']
    protected def jsonConfig = null
    protected def jsonDetailsConfig = "details"

    RestfulBaseController(Class resource) {
        super(resource)
    }

    RestfulBaseController(Class resource, boolean readOnly) {
        super(resource, readOnly)
    }

    @Override
    def index(Integer max) {
        useJsonConfig(jsonConfig, {
            return super.index(max)
        })
    }

    @Override
    def show() {
        useJsonConfig(jsonDetailsConfig, {
            super.show()
        })
    }

    @Override
    def patch() {
        useJsonConfig(jsonDetailsConfig, {
            super.patch()
        })
    }

    @Override
    def update() {
        JSON.use(jsonDetailsConfig, {
            super.update()
        })
    }

    @Override
    def delete() {
        useJsonConfig(jsonDetailsConfig, {
            super.delete()
        })
    }

    @Override
    def save() {
        useJsonConfig(jsonDetailsConfig, {
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

    private def useJsonConfig(config, closure) {
        if (config != null) {
            return JSON.use(config, closure)
        }

        return closure()
    }
}
