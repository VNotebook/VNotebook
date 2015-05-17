package vnotebook

class Library {
    String name
    Date dateCreated
    List notebooks

    static hasMany = [notebooks: Notebook]

    static constraints = {
        name blank: false
    }
}
