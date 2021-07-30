import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
const API_URL = process.env.REACT_APP_API_URL
axios.defaults.baseURL = API_URL

export const signIn = async (params) => {
  try {
    const response = await axios.post(`/sign-in`, params)
    const { data } = response
    axios.defaults.headers.common['Authorization'] = `bearer ${data.auth_token}`
    return data.user
  } catch (error) {
    console.error(error)
    return error
  }
}

export const getThemes = async () => {
  try {
    const response = await axios.get('/themes')
    const { data } = response
    return data.themes
  } catch (error) {
    console.error(error)
    return error
  }
}

// params: {
//   themeId: '',
//   userId: '',
// }
export const newGame = async (params) => {
  try {
    const response = await axios.post('/games/new', params)
    const { data } = response
    return data.game
  } catch (error) {
    console.error(error)
    return error
  }
}

// params: {
//   questionId: '',
//   optionId: '',
// }
export const answerQuestion = async (params) => {
  try {
    const response = await axios.post('/questions/answer', params)
    const { data } = response
    return data.answer
  } catch (error) {
    console.error(error)
    return error
  }
}

export const getNextGameQuestion = async (game_id) => {
  try {
    const response = await axios.get(`/games/${game_id}/questions/next`)
    const { data } = response
    return data.game
  } catch (error) {
    console.error(error)
    return error
  }
}

export const getGameSummary = async (game_id) => {
  try {
    const response = await axios.get(`/games/${game_id}/summary`)
    const { data } = response
    return data.summary
  } catch (error) {
    console.error(error)
    return error
  }
}