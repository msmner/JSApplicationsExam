import controllers from '../controllers/index.js'

const app = Sammy('#root',function(){
    this.use('Handlebars','hbs');

    // //Home
    this.get('#/home',controllers.home.get.home);
    // //User
    this.get('#/user/login',controllers.user.get.login);
    this.get('#/user/register',controllers.user.get.register);
    this.post('#/user/login',controllers.user.post.login);
    this.post('#/user/register',controllers.user.post.register);
    this.get('#/user/logout',controllers.user.get.logout);

    // ///article
    this.get('#/article/create',controllers.article.get.create);
    this.get('#/article/details/:articleID',controllers.article.get.details);
    this.get('#/article/delete/:articleID',controllers.article.del.close);
    this.get('#/article/edit/:articleID',controllers.article.get.edit);
    
    this.post('#/article/edit/:articleID',controllers.article.put.edit);
    this.post('#/article/create',controllers.article.post.create);
    
});

(()=>{
app.run('#/home');
})();