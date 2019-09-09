'use strict'

import projectImp from '../services/projectService'
import taskImp from '../services/taskService'
import koaRouter from 'koa-router'
const router = koaRouter()

router.post('/getProjectCount', projectImp.getProjectCount) // 获取项目个数

router.post('/getProjectList', projectImp.getProjectList) // 获取项目列表

router.get('/getProjectInfo', projectImp.getProjectInfo) // 获取项目基本信息

// todo
router.get('/getProjectDetailInfo', projectImp.getProjectDetailInfo) // 获取项目详细信息

router.get('/getProjectDepartments', projectImp.getProjectDepartments) // 获取项目所属责任单位列表

router.get('/getProjectCoordinates', projectImp.getProjectCoordinates) // 获取项目地块坐标

router.post('/saveProjectCoordinates', projectImp.saveProjectCoordinates) // 保存项目地块坐标(修改/新增)

router.post('/deleteProjectCoordinates', projectImp.deleteProjectCoordinates) // 删除项目地块坐标

router.get('/getProjectApprovalFiles', projectImp.getProjectApprovalFiles) // 获取项目投资批复文件

router.post('/addProjectApprovalFile', projectImp.addProjectApprovalFile) // 新增单个项目投资批复文件

router.post('/addProjectApprovalFiles', projectImp.addProjectApprovalFiles) // 新增多个项目投资批复文件

router.post('/deleteProjectApprovalFile', projectImp.deleteProjectApprovalFile) // 删除项目投资批复文件

router.get('/getProjectExternalFiles', projectImp.getProjectExternalFiles) // 获取项目外部拉取的附件

router.get('/getProjectOpinions', projectImp.getProjectOpinions) // 获取项目评审意见

router.post('/saveProject', projectImp.saveProject) // 保存项目 (新增或修改)

router.get('/getSubProjects', projectImp.getSubProjects) // 获取子项目列表

router.post('/saveSubProjects', projectImp.saveSubProjects) // 保存多个子项目(修改/新增)

router.post('/deleteSubProjects', projectImp.deleteSubProjects) // 删除多个子项目

router.post('/addProjectDepartments', projectImp.addProjectDepartments) // 添加项目责任单位

router.post('/deleteProjectDepartments', projectImp.deleteProjectDepartments) // 删除项目责任单位

router.post('/confirmProjectDepartment', projectImp.confirmProjectDepartment) // 确认项目责任单位

router.post('/getInspectionCount', projectImp.getInspectionCount) // 获取项目巡查记录个数

router.post('/getInspectionList', projectImp.getInspectionList) // 获取项目巡查记录列表

router.post('/addInspection', projectImp.addInspection) // 添加项目巡查

router.post('/completeInspection', projectImp.completeInspection) // 完成项目巡查

router.post('/addInspectionFile', projectImp.addInspectionFile) // 添加项目巡查记录附件

router.post('/deleteInspectionFile', projectImp.deleteInspectionFile) // 删除项目巡查记录附件

router.get('/getProjectLifecycle', projectImp.getProjectLifecycle) // 获取项目生命周期

router.post('/updateProjectState', projectImp.updateProjectState) // 项目生命周期状态更新

router.get('/getProjectNewStatusCount', projectImp.getProjectNewStatusCount) // 获取可更新状态项目个数

// 任务管理路由集

router.post('/editOrganization', taskImp.editOrganization) // 组织架构编辑

router.post('/createTask', taskImp.createTask) //  创建任务

router.get('/getOrganizationList', taskImp.getOrganizationList) // 获取组织架构列表

router.get('/getContracList', taskImp.getContracList) // 获取组织架构通讯录列表

router.post('/updateContract', taskImp.updateContract) // 获取组织架构通讯录

router.get('/getTaskTypeList', taskImp.getTaskTypeList) // 获取组织架构、任务类型、模板类型列表

router.get('/getColumnList', taskImp.getColumnByTemplateId) // 获取模板包含字段

router.get('/getTaskById', taskImp.getTaskDetail) // 获取任务详情

router.post('/updateTask', taskImp.updateTask) // 通过ID查询任务 编辑信息

router.get('/getColumns', taskImp.getAllColumn) // 获取所有字段

router.delete('/deleteColumn', taskImp.deleteColumnById) // 获取所有字段

router.post('/createColumn', taskImp.createColumn) // 获取所有字段

router.post('/createTemplate', taskImp.createTemplate) // 创建模板

router.post('/updateTemplate', taskImp.updateTemplate) // 更新模板

router.post('/deleteTemolate', taskImp.deleteTemolate) // 删除模板

router.get('/getTemplateList', taskImp.getTemplateList) // 获取模板列表

router.get('/taskCenter', taskImp.taskManage) // 任务管理中心

router.post('/updateTaskStatus', taskImp.updateTaskStatus) // 更改任务状态

router.get('/getTaskList', taskImp.getTaskList) // 获取任务列表

router.post('/createEvent', taskImp.createEvent) // 大事件创建

router.get('/getEventList', taskImp.getEventList) // 大事件列表

router.get('/getEvemtDetail', taskImp.getEvemtDetail) // 大事件详情

router.get('/getMeetingList', taskImp.getMeetingList) // 会议列表

router.post('/createMeeting', taskImp.createMeeting) // 创建会议

export default router
