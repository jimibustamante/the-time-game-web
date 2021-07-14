import Option from './Option'

export default class Question {
  constructor ({ id, text, completed, options }) {
    this.id = id
    this.text = text
    this.completed = completed
    this.setOptions(options)
  }

  setOptions (options) {
    let questionOptions = []
    options.forEach(option => {
      questionOptions.push(new Option(option))
    });
    this.options = questionOptions
  }
}
