package vnotebook

/**
 * Represents a single page from a Notebook
 */
class Page {
    List contentList
    String normalizedContent

    static hasMany = [contentList: PageContent]
    static belongsTo = [notebook: Notebook]

    static constraints = {
    }
}
