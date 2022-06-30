import React from 'react'
import { SyncOutlined } from '@ant-design/icons'

const Spinner = () => {
  return (
    <div className="spinner">
      <h1>Loading<SyncOutlined spin /></h1>
    </div>
  )
}

export default Spinner