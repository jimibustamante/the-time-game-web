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
    console.log({response})
    const { data } = response
    return data.themes
  } catch (error) {
    console.error(error)
    return error
  }
}