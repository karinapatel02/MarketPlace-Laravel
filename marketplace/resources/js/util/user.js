class User {

    constructor() {
        this.init()
    }

    init() {
        this.uid = localStorage.getItem('uid')
        this.token = localStorage.getItem('token')
        this.uname = localStorage.getItem('username')
        this.role = localStorage.getItem('role')
        this.loggedIn = localStorage.getItem('userLoggedIn')
        this.fname = localStorage.getItem('fname')
        this.lname = localStorage.getItem('lname')
        this.email = localStorage.getItem('email')
        this.phone_number = localStorage.getItem('phone_number')
    }

    authenticated(data) {
        localStorage.setItem('uid', data.user.uid)
        localStorage.setItem('username', data.user.username)
        localStorage.setItem('userLoggedIn', true)
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.user.role_type)
        localStorage.setItem('fname', data.user.fname)
        localStorage.setItem('lname', data.user.lname)
        localStorage.setItem('email', data.user.email)
        localStorage.setItem('phone_number', data.user.phone_number)
        this.init()
    }

    isLoggedIn() {
        return Boolean(this.loggedIn) === true
    }

    destroy() {
        localStorage.clear();
    }

    logout() {
        this.destroy();
    }
}

export default new User()