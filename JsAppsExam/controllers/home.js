import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        home(context) {
            let check = localStorage.getItem('loggedIn');
            if (check == "true") {
                models.article.getAll().then((response) => {
                    const articles = response.docs.map(docModifier);

                    context.articles = articles;

                    let javaArticles = [];
                    let csharpArticles = [];
                    let javaScriptArticles = [];
                    let pythonArticles = [];

                    [...context.articles].forEach((article) => {
                        if (article.category == "JavaScript") {
                            javaScriptArticles.push(article);
                        } else if (article.category == "C#") {
                            csharpArticles.push(article);
                        } else if (article.category == "Java") {
                            javaArticles.push(article);
                        } else if (article.category == "Pyton") {
                            pythonArticles.push(article);
                        }
                    })

                    javaScriptArticles.sort((a, b) => {
                        return b.title.localeCompare(a.title);
                    });

                    csharpArticles.sort((a, b) => {
                        return b.title.localeCompare(a.title);
                    });

                    javaArticles.sort((a, b) => {
                        return b.title.localeCompare(a.title);
                    });

                    pythonArticles.sort((a, b) => {
                        return b.title.localeCompare(a.title);
                    });

                    context.javaArticles = javaArticles;
                    context.csharpArticles = csharpArticles;
                    context.javaScriptArticles = javaScriptArticles;
                    context.pythonArticles = pythonArticles;

                    extend(context).then(function () {
                        this.partial('../views/home/home.hbs');
                    })
                }).catch((err) => console.log(err));
            } else {
                extend(context).then(function () {
                    this.partial('../views/home/home.hbs');
                });
            }
        },
    }
}