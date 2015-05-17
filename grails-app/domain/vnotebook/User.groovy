package vnotebook

import java.security.SecureRandom

class User {
    transient springSecurityService

    String username
    String password
    boolean enabled = true
    boolean accountExpired = false
    boolean accountLocked = false
    boolean passwordExpired = false
    String email
    String firstName
    String lastName
    String salt

    static transients =  ['springSecurityService']

    static constraints = {
        username blank: false, unique: true
        password blank: false
        email blank: false, unique: true
        salt nullable: true, maxSize: 64
    }

    static mapping = {
        table '`user`'
    }

    Set<Role> getAuthorities() {
        UserRole.findAllByUser(this).collect { it.role }
    }

    def beforeInsert() {
        def code = new byte[48]
        new SecureRandom().nextBytes(code)
        this.salt = code.encodeBase64()
        encodePassword()
    }

    def beforeUpdate() {
        if (isDirty('password')) {
            encodePassword()
        }
    }

    protected void encodePassword() {
        password = springSecurityService.encodePassword(password, salt)
    }
}
