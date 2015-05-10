package vnotebook

class Widget {
    String name
    String description
    String html

    static constraints = {
        name blank: false, size: 1..20
        description blank: true
        html blank: false
    }
}
