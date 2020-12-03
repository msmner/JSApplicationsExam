export default function (context) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            context.loggedIn = true;
            context.username = user.email;
            context.userId = user.uid;

            localStorage.setItem('userId',user.uid);
            localStorage.setItem('userEmail',user.email);
            localStorage.setItem('loggedIn',true);

        } else {
            context.loggedIn = false;
            context.username = null;
            context.userId = null;

            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            localStorage.setItem('loggedIn',false);
        }
    });

    return  context.loadPartials({
        header: '../views/common/header.hbs',
        footer: '../views/common/footer.hbs'
    });
}
