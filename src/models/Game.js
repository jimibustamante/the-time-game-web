import Question from './Question'

export default class Game {
  constructor ({ id, question, max_questions, questions_completed }) {
    this.id = id
    this.maxQuestions = max_questions
    this._currentQuestion = question
    this.questions_completed = questions_completed
  }

  set currentQuestion (question) {
    this._currentQuestion = new Question(question)
  }

  get currentQuestion () {
    return this._currentQuestion
  }

}
