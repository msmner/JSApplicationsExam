import models from '../models/index.js';
import extend from '../utils/context.js';

export default {
    get: {
        login(context) {
            extend(context)
                .then(function () {
                    this.partial('../views/home/home.hbs');
                })
        },
        register(context) {
            extend(context).then(function () {
                this.partial('../views/user/register.hbs');
            })
        },
        logout(context) {
            localStorage.setItem('loggedIn', false);
            models.user.logout().then((response) => {
                context.redirect('#/home');

            }).catch((err) => console.log(err));
        }
    },
    post: {
        login(context) {
            const { email, password } = context.params;

            localStorage.setItem('loggedIn', true);

            models.user.login(email, password)
                .then((response) => {
                    context.loggedIn = true;
                    context.user = response;
                    context.email = response.email;
                    context.redirect('#/home');
                })
        },
        register(context) {
            const { email, password } = context.params;
            
            localStorage.setItem('loggedIn', true);

            models.user.register(email, password)
                .then((response) => {
                    context.redirect('#/home');
                })
                .catch((err) => console.log(err));
        }
    }
}