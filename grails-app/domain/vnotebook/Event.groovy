package vnotebook

class Event {

	String title
	String type
	Date startsAt
	Date endsAt

	static belongsTo = [owner: User]

    static constraints = {
    	title blank: false
    }
}
