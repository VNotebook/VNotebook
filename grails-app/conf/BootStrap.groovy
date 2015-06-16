import vnotebook.Role
import vnotebook.User
import vnotebook.UserRole

class BootStrap {

    def init = { servletContext ->
        // Roles setup
        Role roleUser = new Role(authority: "ROLE_USER")
        roleUser.save()
        Role roleAdmin = new Role(authority: "ROLE_ADMIN")
        roleAdmin.save()

        User user = new User(username: "test", password: "test123", accountExpired: false, email: "test@test.com",
                firstName: "Test", lastName: "VNoteBook")
        user.save()
        User admin = new User(username: "admin", password: "admin123", accountExpired: false, email: "admin@test.com",
                firstName: "Admin", lastName: "VNoteBook")
        admin.save()

        new UserRole(user: admin, role: roleAdmin).save()
    }

    def destroy = {
    }
}
