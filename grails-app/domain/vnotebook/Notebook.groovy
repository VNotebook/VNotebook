package vnotebook

class Notebook {
    String name
    User owner
    Collection pages
    Library library

    static hasMany = [pages: Page]

    static constraints = {
    }
}
