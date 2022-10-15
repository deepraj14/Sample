import React from 'react'
import 'assets/css/Header.css'
import Dropdown from 'components/Dropdown'
export default function Header() {
  return (
    <div className="header-container">
      <div className="header-sub-container">
        <div className="codeg-logo"><img src="/icons/CodeG-Logo.png" alt="CodeG Logo" /></div>
        <div className="header-content">
          <span className="logo-text">CODE<span>G</span></span>
          <Dropdown/>
          <form className="file-name-textbox">
            <input className="file-name" type="text" placeholder="Untitled" />
            <button className="file-name-button">Save</button>
          </form>
          <div className="user-info">
            <div className="sign-in">
              Sign In
            </div>
            <div className="sign-up">
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
