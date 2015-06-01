class UrlMappings {

	static mappings = {
        group "/api", {
            "/widgets"(resources: "widget")
            "/users"(resources: "user")
            "/events"(resources: "event")
            "/libraries"(resources: "library") {
                "/notebooks"(resources: "notebook")
            }
        }

        "/$controller/$action?/$id?(.$format)?" {
            constraints {
                // apply constraints here
            }
        }

        "/"(uri:"/index.html")
        "500"(view:'/error')
	}
}
