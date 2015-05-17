package vnotebook

/**
 * Represents a single page from a Notebook
 */
class Page {
    String svgContent
    String normalizedContent

    Date pageDate
    Date createdDate
    Date lastUpdated

    static belongsTo = [notebook: Notebook]

    static constraints = {
        svgContent blank: false
        normalizedContent blank: false
    }
}
