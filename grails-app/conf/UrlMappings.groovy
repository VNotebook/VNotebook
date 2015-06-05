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

        "/"(uri:"/index.html")
        "500"(view:'/error')
	}
}
