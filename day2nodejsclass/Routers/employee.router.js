import express from 'express'
import {getEmployeesDetails, getEmployeesDetailsById, createEmployeeDetail, updateEmployeedetail, deleteEmployeeDetail} from '../Controllers/employee.controller.js'

const router= express.Router()

router.get('/data',getEmployeesDetails)
router.get('/:id',getEmployeesDetailsById)
router.post('/create',createEmployeeDetail)
router.put('/edit/:id',updateEmployeedetail)
router.delete('/delete/:id',deleteEmployeeDetail)

export default router;