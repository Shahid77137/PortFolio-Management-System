import axios from "axios";

import { useNavigate } from 'react-router-dom';

export let base="https://projectgenie.onrender.com"
export const login=async (data)=>{
    try{
        const received=await axios.post(base+'/user/login',data)
        return received.status;
    }catch(error){
        let status=error.response.status
        return status
    }
}
export const signup=async (data)=>{
    return await axios.post(base+'/user/signup',data)
}
export const logout=async(email)=>{
    return await axios.get(base+'/user/logout/'+email)
}
export const deleteUser=async(email)=>{
    try{
        let result=await axios.delete(base+'/user/delete/'+email)
        return result

    }catch(error){
        let status=error.response.status
        return status
    }
    
}
export const updateUser=async(email,data)=>{
    return await axios.put(base+'/user/update/'+email,data)
}
export const showManagers=async (email)=>{
    return await axios.get(base+'/user/managers/'+email)
}
export const isAdmin=async (email)=>{
    return await axios.get(base+"/user/isadmin/"+email)
}
export const addProject=async(email,data)=>{
    try{
        let result=await axios.post(base+'/project/'+email,data)
        return result

    }catch(error){
        let status=error.response.status
        return status
    }
}
export const assignProject=async(email,data)=>{
    return await axios.put(base+'/project/'+email,data)
}
export const updateProject=async(email,data)=>{
    try{
        let result=await axios.patch(base+'/project/'+email,data)
        return result

    }catch(error){
        let status=error.response.status
        return status
    }
}
export const showProjects=async(email)=>{
    let data= (await axios.get(base+'/project/'+email))
    return data
}
export const showProject=async(email,projectId)=>{
    return await axios.get(`${base}/project/${email}/${projectId}`)
}
export const deleteProject=async(email,projectId)=>{
    try{
        let result=await axios.delete(`${base}/project/${email}/${projectId}`)
        return result

    }catch(error){
        let status=error.response.status
        return status
    }
    // try{
    //     let result=""
    //     return result

    // }catch(error){
    //     let status=error.response.status
    //     return status
    // }
}
export const createResource=async(email,res)=>{
    return await axios.post(`${base}/res/${email}`,res)
}
export const deleteResource=async(email,resid)=>{
    try{
        let result=await axios.delete(`${base}/res/${email}/${resid}`)
        return result

    }catch(error){
        let status=error.response.status
        return status
    }
}
export const updateResource=async(email,resid,res)=>{
    return await axios.patch(`${base}/res/${email}/${resid}`,res)
}
export const showResources=async(email)=>{
    return await axios.get(`${base}/res/${email}`)
}
export const showResource=async (email,resid)=>{
    return await axios.get(`${base}/res/${email}/${resid}`)
}
export const assignResource=async(email,task,resid)=>{
    return await axios.patch(`${base}/res/${email}/${task}/${resid}`)
}
export const createTask = async(email,projectId,task)=>{
    return await axios.post(`${base}/task/${email}/${projectId}/${task}`)
}
export const deleteTask = async(email,projectId,task)=>{
    return await axios.delete(`${base}/task/${email}/${projectId}/${task}`)
}
export const updateTask= async(email,projectId,task)=>{
    return await axios.put(`${base}/task/${email}/${projectId}`,task)
}
export const showTasks=async(email,projectid)=>{
    return await axios.get(base+"/"+email+"/"+projectid)
}
export const showTask=async(email,projectid,task)=>{
    return await axios.get(base+"/"+email+"/"+projectid+"/"+task)
}



