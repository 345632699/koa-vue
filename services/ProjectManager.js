'use strict'
import axios from '~/plugins/axios'

async function getBaseData (showAllItem) {
  let regions = []
  let departments = []
  let projectTypes = []
  let engineerings = []

  let resRegions = await axios.get('/open/getRegions')
  if (resRegions.status === 200 && resRegions.data.ret === 0) {
    regions = []
    if (showAllItem) regions.push({id: 0, name: '全市'})
    for (let item of resRegions.data.data) {
      regions.push({id: item.id, name: item.name})
    }
  }
  let resDepartments = await axios.get('/open/getDepartments')
  if (resDepartments.status === 200 && resDepartments.data.ret === 0) {
    departments = []
    if (showAllItem) departments.push({id: 0, name: '全部单位'})
    for (let item of resDepartments.data.data) {
      departments.push({id: item.id, name: item.name})
    }
  }
  let resProjectTypes = await axios.get('/open/getProjectTypes')
  if (resProjectTypes.status === 200 && resProjectTypes.data.ret === 0) {
    projectTypes = []
    if (showAllItem) projectTypes.push({id: 0, name: '全部类型'})
    for (let item of resProjectTypes.data.data) {
      projectTypes.push({id: item.id, name: item.name})
    }
  }
  let resEngineeringTypes = await axios.get('/open/getEngeeringTypes')
  if (resEngineeringTypes.status === 200 && resEngineeringTypes.data.ret === 0) {
    engineerings = []
    if (showAllItem) engineerings.push({id: 0, name: '全部类型'})
    for (let item of resEngineeringTypes.data.data) {
      engineerings.push({id: item.id, name: item.name})
    }
  }

  return { regions: regions,
    departments: departments,
    projectTypes: projectTypes,
    engineerings: engineerings
  }
}

export default {
  getBaseData
}
