
import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Switcher() {

    let htmlTag = document.getElementsByTagName("html")[0]
    const changeTheme = (e:any) => {
        if (htmlTag.className.includes("dark")) {
            htmlTag.className = 'light'
        } else {
            htmlTag.className = 'dark'
        }
    }

    const modeChange = () => {
        const switcherRtl = document.getElementById("switchRtl");
        if (switcherRtl && switcherRtl.innerText === "LTR") {
            htmlTag.dir = "ltr";
        } else {
            htmlTag.dir = "rtl";
        }
    };

  return (
    <>
     
    </>
  )
}
