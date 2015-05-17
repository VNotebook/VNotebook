package vnotebook



import grails.test.mixin.*
import spock.lang.*

@TestFor(UserController)
@Mock(User)
class UserControllerSpec extends Specification {
    // As this class requires dependencies, it needs special attention to the way it's tested.

    /*def setup() {
        this.model = User
    }

    def populateValidParams(params) {
        params['username'] = 'my_user'
        params['password'] = 'my_pass'
        params['firstName'] = 'The'
        params['lastName'] = 'User'
        params['email'] = 'test@somewhere.com'
    }

    def generateInitialItems() {
        return [new User(username: "test", password: "test123", accountExpired: false, email: "test@test.com",
                         firstName: "Test", lastName: "VNoteBook"),
                new User(username: "admin", password: "admin123", accountExpired: false, email: "admin@test.com",
                        firstName: "Admin", lastName: "VNoteBook")]
    }*/
}
