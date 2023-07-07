import React from 'react'
import Button from './Button'

const ModuleHandling = () => {
    const handleclick=()=>{
console.log("Clicked")
    }
    return (
        <div>
            <Button onclick={handleclick} text="Click">  </Button>
        </div>
    )
}

export default ModuleHandling