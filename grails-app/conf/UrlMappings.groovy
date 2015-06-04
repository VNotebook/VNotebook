class UrlMappings {

	static mappings = {
        group "/api", {
            "/widgets"(resources: "widget")
            "/users"(resources: "user")
            "/libraries"(resources: "library") {
                "/notebooks"(resources: "notebook")
            }
        }

        "/"(uri:"/index.html")
        "500"(view:'/error')
	}
}
