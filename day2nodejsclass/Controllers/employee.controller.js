const employees=[
    {id:1, name:"suresh"},
    {id:2, name:"renu"},
    {id:3, name:"rithvik"},
    {id:4, name:"sathvik"}
]

export const getEmployeesDetails = (req,res)=>{
    res.status(200).json({data:employees})
}

export const getEmployeesDetailsById =(req,res)=>{
    const empId= req.params.id  //2
    const empIdDetail= employees.find(emp=>emp.id == empId)  //{id:2,name:"renu"}

    if(!empIdDetail){
        return res.status(404).json({message:"Detail not found in particular Id"})
    }
    res.status(200).json({message:"Employee Details", data:[empIdDetail]})  
}

export const createEmployeeDetail=(req,res)=>{
    const newEmployeeDetail={
        id:employees.length+1,
        name:req.body.name
    }
    employees.push(newEmployeeDetail)
    res.status(201).json({message:"New employee detail added",data:[newEmployeeDetail]})
}

export const updateEmployeedetail=(req,res)=>{
    const empId= req.params.id
    const empDetail= employees.find(emp=>emp.id == empId)
    if(!empDetail){
        return res.status(200).json({message:"emp detail not found", data:[]})
    }
    empDetail.name= req.body.name
    res.status(200).json({message:"Detail updated", data:[empDetail]})
}

export const deleteEmployeeDetail=(req,res)=>{
    const empId= req.params.id
    const empDetailIndex= employees.findIndex(emp=>emp.id == empId)
    console.log("empDetailIndex",empDetailIndex);
    if(empDetailIndex === -1){
        return res.status(200).json({message:"deatail not found"})
    }
    employees.splice(empDetailIndex, 1)
    res.status(200).json({message:"empdetail deleted"})    
}