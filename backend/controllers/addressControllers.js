const axios = require('axios')
const Address = require('../models/addressModel')

const addressControllers = {
  fetchAndSaveProvinces: async (req, res) => {
    try {
      const provincesResponse = await axios.get(
        'https://provinces.open-api.vn/api/p/'
      )
      const provinces = provincesResponse.data
      for (const province of provinces) {
        const existingProvince = await Address.findOne({ code: province.code })
        if (existingProvince) continue

        const districtsResponse = await axios.get(
          `https://provinces.open-api.vn/api/p/${province.code}?depth=2`
        )
        const districts = districtsResponse.data.districts

        const districtPromises = districts.map(async (district) => {
          const wardsResponse = await axios.get(
            `https://provinces.open-api.vn/api/d/${district.code}?depth=2`
          )
          district.wards = wardsResponse.data.wards
          return district
        })

        const populatedDistricts = await Promise.all(districtPromises)
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

  getProvinceByCode: async (req, res) => {
    try {
      const { code } = req.params
      const province = await Address.findOne({ code }).select(
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

  getDistrictsByProvinceCode: async (req, res) => {
    try {
      const { provinceCode } = req.params
      const province = await Address.findOne({ code: provinceCode }).select(
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

  getWardsByDistrictCode: async (req, res) => {
    try {
      const { provinceCode, districtCode } = req.params
      const province = await Address.findOne(
        { code: provinceCode, 'districts.code': districtCode },
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

  getAllData: async (req, res) => {
    try {
      const addresses = await Address.find().populate({
        path: 'districts',
        populate: {
          path: 'wards'
        }
      })

      res.status(200).json(addresses)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Lỗi khi lấy dữ liệu' })
    }
  },

  deleteProvinceByCode: async (req, res) => {
    try {
      const { code } = req.params
      const deletedProvince = await Address.findOneAndDelete({ code })
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
