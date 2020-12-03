import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        create(context) {
            extend(context).then(function () {
                this.partial('../views/articles/create.hbs');
            })
        },
        details(context) {
            let { articleID } = context.params;

            models.article.get(articleID).then((response) => {
                let article = docModifier(response);
                context.article = article;

                Object.keys(article).forEach((key) => {
                    context[key] = article[key];
                })

                context.isCreator = article.creator === localStorage.getItem('userEmail');

                extend(context).then(function () {
                    this.partial('../views/articles/details.hbs');
                })
            }).catch((err) => console.log(err));
        },
        edit(context) {
            let { articleID } = context.params;

            models.article.get(articleID).then((response) => {
                let article = docModifier(response);
                context.article = article;

                Object.keys(article).forEach((key) => {
                    context[key] = article[key];
                })

                extend(context).then(function () {
                    this.partial('../views/articles/edit.hbs');
                })
            }).catch((err) => console.log(err));
        }
    },
    post: {
        create(context) {

            const data = {
                ...context.params,
                creator: localStorage.getItem('userEmail'),
            }
            models.article.create(data).then((response) => {
                context.redirect('#/home');
            })
        }
    },
    del: {
        close(context) {
            const { articleID } = context.params;
            
            models.article.close(articleID).then((response) => {
                context.redirect('#/home');
            }).catch((err) => console.log(err));
        }
    },
    put: {
        edit(context) {
            let { articleID } = context.params;

            models.article.get(articleID).then((response) => {
                let article = docModifier(response);
                
                Object.keys(article).forEach((key) => {
                    context[key] = article[key];
                })
                
                context.article = article;

                return models.article.update(articleID, { ...context.params })
            }).then((response) => {
                context.redirect('#/home');

            }).catch((err) => console.log(err));
        }
    }
}