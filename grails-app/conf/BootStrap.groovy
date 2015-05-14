import vnotebook.Role
import vnotebook.User
import vnotebook.UserRole

class BootStrap {

    def init = { servletContext ->
        User user = new User(username: "test", password: "test123", accountExpired: false, email: "test@test.com",
                firstName: "Test", lastName: "VNoteBook")
        user.save()

        Role roleUser = new Role(authority: "ROLE_USER")
        roleUser.save()

        new UserRole(user: user, role: roleUser).save()
    }
    def destroy = {
    }
}
