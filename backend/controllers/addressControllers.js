const axios = require('axios')
const Address = require('../models/addressModel')

const addressControllers = {
  fetchAndSaveProvinces: async (req, res) => {
    try {
      // Lấy danh sách tất cả các tỉnh từ API
      const provincesResponse = await axios.get(
        'https://provinces.open-api.vn/api/p/'
      )
      const provinces = provincesResponse.data

      // Duyệt qua từng tỉnh để lấy dữ liệu huyện và xã
      for (const province of provinces) {
        // Kiểm tra nếu tỉnh đã tồn tại
        const existingProvince = await Address.findOne({ code: province.code })
        if (existingProvince) continue

        // Lấy dữ liệu các huyện trong tỉnh
        const districtsResponse = await axios.get(
          `https://provinces.open-api.vn/api/p/${province.code}?depth=2`
        )
        const districts = districtsResponse.data.districts

        // Tạo các Promise để lấy dữ liệu các xã trong huyện
        const districtPromises = districts.map(async (district) => {
          const wardsResponse = await axios.get(
            `https://provinces.open-api.vn/api/d/${district.code}?depth=2`
          )
          district.wards = wardsResponse.data.wards
          return district
        })

        // Chờ hoàn thành tất cả các request lấy dữ liệu xã
        const populatedDistricts = await Promise.all(districtPromises)

        // Tạo đối tượng Address mới và lưu vào DB
        const newProvince = new Address({
          name: province.name,
          code: province.code,
          districts: populatedDistricts
        })

        await newProvince.save()
      }

      res.status(200).json({ message: 'Successfully saved provinces data' })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        message: 'Error fetching and saving provinces data',
        error: error.message
      })
    }
  },

  getAllProvinces: async (req, res) => {
    try {
      // Chỉ lấy thông tin cơ bản của các tỉnh
      const provinces = await Address.find().select(
        'name code districts.name districts.code'
      )
      res.status(200).json(provinces)
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching provinces data',
        error: error.message
      })
    }
  },

  getProvinceById: async (req, res) => {
    try {
      const { id } = req.params
      const province = await Address.findById(id).select(
        'name code districts.name districts.code districts.wards.name districts.wards.code'
      )
      if (!province) {
        return res.status(404).json({ message: 'Province not found' })
      }
      res.status(200).json(province)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching province data', error: error.message })
    }
  },

  getDistrictsByProvinceId: async (req, res) => {
    try {
      const { provinceId } = req.params
      const province = await Address.findById(provinceId).select(
        'districts.name districts.code'
      )
      if (!province) {
        return res.status(404).json({ message: 'Province not found' })
      }
      res.status(200).json(province.districts)
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching districts data',
        error: error.message
      })
    }
  },

  getWardsByDistrictId: async (req, res) => {
    try {
      const { provinceId, districtId } = req.params
      const province = await Address.findOne(
        { _id: provinceId, 'districts._id': districtId },
        { 'districts.$': 1 }
      )
      if (!province) {
        return res.status(404).json({ message: 'District not found' })
      }
      res.status(200).json(province.districts[0].wards)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching wards data', error: error.message })
    }
  },

  deleteProvinceById: async (req, res) => {
    try {
      const { id } = req.params
      const deletedProvince = await Address.findByIdAndDelete(id)
      if (!deletedProvince) {
        return res.status(404).json({ message: 'Province not found' })
      }
      res.status(200).json({ message: 'Province deleted successfully' })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error deleting province', error: error.message })
    }
  }
}

module.exports = addressControllers
