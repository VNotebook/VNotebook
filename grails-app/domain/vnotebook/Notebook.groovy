package vnotebook

class Notebook {
    String name
    User owner
    Collection pages

    static hasMany = [pages: Page]

    static constraints = {
    }
}
