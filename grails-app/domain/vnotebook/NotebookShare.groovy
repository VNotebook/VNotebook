package vnotebook

class NotebookShare {
    static belongsTo = [notebook: Notebook, sharedWith: User]

    Date dateCreated

    static constraints = {
        sharedWith(unique: 'notebook')
    }
}
