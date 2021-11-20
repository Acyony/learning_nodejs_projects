const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const QuestionsModel = require('./database/Questions');
const AnswerModel = require('./database/Answer');

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Connected with the database!')
    })
    .catch((err) => {
        console.log('err')
    })

// "Informing" the express to use the EJS as view engine
app.set('view engine', 'ejs');

// Define I want to use static archives
app.use(express.static('public'));

// bodyParser => translate the data that is coming from the form
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
// app.use(bodyParser());


// routes
app.get("/", (req, res) => {
    // findAll() => will search all questions on the table and return them to us.
    QuestionsModel.findAll({
        raw: true, order: [
            ['id', 'DESC'] // or ASC
        ]
    }).then(questions => {
        res.render("index", {
            questions: questions
        })

    })
})

app.get("/ask", (req, res) => {
    res.render("ask")
})

app.post("/saveQuestions", (req, res) => {
    console.log(req.body)
    // req data from the form by the => name
    let title = req.body.title;
    let description = req.body.description;
    // To save the questions in a table. First we have to assign it to a var => questionsModel and then call the method creat()
    QuestionsModel.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect("/");
    })
})

app.get("/question/:id", (req, res) => {
    let id = req.params.id;
    QuestionsModel.findOne({
        where: {id: id}
    }).then(question => {
        if (question != undefined) {
            AnswerModel.findAll({
                where: {questionId: question.id},
                order: [['id', 'DESC']]

            }).then((answers) => {
                res.render("question", {
                    question: question,
                    answers: answers
                })
            })

        } else {
            res.redirect("/");
        }
    })
})

app.post("/answer", (req, res) => {
    /*this route will receive the data from the answer form*/
    let body = req.body.body;
    let questionId = req.body.question;
    console.log(body);
    console.log(questionId)
    AnswerModel.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect("/question/" + questionId);
    }).catch((e) => {
        console.log(e);
        res.redirect("/question/" + questionId);
    })

})
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("App is running at the port", port);
})