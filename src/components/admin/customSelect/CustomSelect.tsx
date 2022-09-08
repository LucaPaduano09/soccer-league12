import React from 'react'

const CustomSelect = () => {
    const goal = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  return (
    <select>
        {
            goal.map((g,index) => (
                <option>
                    
                </option>
            ))
        }
    </select>
  )
}

export default CustomSelect