import React from 'react'
import DashBoard from './mainFrame/DashBoard'
import ManagerDash from './mainFrame/ManagerDash'
import ResourceManager from './mainFrame/ResourceManager'
import TaskManager from './mainFrame/TaskManager'

const MainFrame = ({nav}) => {
  return (
    <div className="mainframe">
        {nav=="Project Dashboard" && <DashBoard/>}
        {nav=="Project Manager" && <ManagerDash/>}
        {nav=="Task Manager" && <TaskManager/>}
        {nav=="Resource Manager" && <ResourceManager/>}

    </div>
  )
}

export default MainFrame