import React from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import UserPanel from '../user-panel/user-panel';
import './header.scss';
import './header.css';
import { Template } from 'devextreme-react/core/template';
import {AiOutlineSearch} from 'react-icons/ai'
import { useNavigation } from '../../contexts/navigation';
import Axios from 'axios'
import Constants from '../../core/serverurl';
import { useLocation } from 'react-router-dom';
export default function Header({ menuToggleEnabled, title, toggleMenu }) {
  const {setData,callPage} = useNavigation()
  const location = useLocation()
  const onChange = (e) => {
    e.preventDefault()
    let keyword = document.getElementById("yo").value
    Axios.post(`${Constants.serverlink}search`, {
      keyword : keyword,
      path : location.pathname
    },{
      headers : {
        "token" : localStorage.getItem('token')
      }
    }).then(r => {
      if (keyword.trim() === "") {
        return callPage() 
      } 
      setData(r.data)
    })
  }
  const onEmpty = (e) => {
     if (e.target.value.trim() === "") {
       callPage()
     }
  }
  return (
    <header className={'header-component'}>
      <Toolbar className={'header-toolbar'}>
      <Item location="before">
                <form className='my-div-search' onSubmit={(e) => onChange(e)}>
                  <AiOutlineSearch style={{fontSize:'20px'}}/>
                <input type='text' placeholder={'Search...'} id="yo" className='my-search' onChange={(e) => onEmpty(e)}/>
                <input type="submit" hidden />
                </form>
        </Item>
        <Item
          visible={menuToggleEnabled}
          location={'before'}
          widget={'dxButton'}
          cssClass={'menu-button'}
        >
          <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
        </Item>
        <Item
          location={'before'}
          cssClass={'header-title'}
          text={title}
          visible={!!title}
        />
        <Item
          location={'after'}
          locateInMenu={'auto'}
          menuItemTemplate={'userPanelTemplate'}
        >
          <Button
            className={'user-button authorization'}
            width={210}
            height={'100%'}
            stylingMode={'text'}
          >
            <UserPanel menuMode={'context'} />
          </Button>
        </Item>
        <Template name={'userPanelTemplate'}>
          <UserPanel menuMode={'list'} />
        </Template>
      </Toolbar>
    </header>
)}
