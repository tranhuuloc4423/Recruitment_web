import axios from '../../axios'

const getChartUser = async () => {
  try {
    const res = await axios.get(`/chart/user`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const getChartPost = async () => {
    try {
      const res = await axios.get(`/chart/post`)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const getChartApplication = async () => {
    try {
      const res = await axios.get(`/chart/application`)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }


  export { getChartUser, getChartPost, getChartApplication }