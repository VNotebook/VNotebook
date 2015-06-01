package vnotebook

class Event {

	String title
	String type
	Date startDate
	Date endDate

	static belongsTo = [owner: User]

    static constraints = {
    	title blank: false
    	type blank: false
    	startDate blank: false
    	endDate blank: false
    	owner blank: false
    }
}
