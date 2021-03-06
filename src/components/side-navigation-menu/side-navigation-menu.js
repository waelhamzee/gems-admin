import React, { useEffect , useRef, useCallback, useMemo, useState } from 'react';
import TreeView from 'devextreme-react/tree-view';
import { useNavigation } from '../../contexts/navigation';
import { useScreenSize } from '../../utils/media-query';
import './side-navigation-menu.scss';
import { AiOutlinePlus,AiOutlineDelete } from 'react-icons/ai';
import * as events from 'devextreme/events';
import { FileManager } from 'devextreme-react';
import { Permissions } from 'devextreme-react/file-manager';

export default function SideNavigationMenu(props) {
  const {
    children,
    selectedItemChanged,
    openMenu,
    compactMode,
    onMenuReady
  } = props;
  const {navigation,normalizePath,setPopupVisible3,setPopupVisible4} = useNavigation()
  const [state, setState] = useState([])

  const { isLarge } = useScreenSize();
  const items = useMemo(
    normalizePath,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { navigationData: { currentPath } } = useNavigation();

  const treeViewRef = useRef();
  const wrapperRef = useRef();
  const getWrapperRef = useCallback((element) => {
    const prevElement = wrapperRef.current;
    if (prevElement) {
      events.off(prevElement, 'dxclick');
    }

    wrapperRef.current = element;
    events.on(element, 'dxclick', e => {
      openMenu(e);
    });
  }, [openMenu]);

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance;
    if (!treeView) {
      return;
    }

    if (currentPath !== undefined) {
      treeView.selectItem(currentPath);
      treeView.expandItem(currentPath);
    }

    if (compactMode) {
      treeView.collapseAll();
    }
  }, [currentPath, compactMode]);

  


  return (

    <div
      className={'dx-swatch-additional side-navigation-menu'}
      ref={getWrapperRef}
    >
      {children}
      <div className={'menu-container'}>
       <div className='waell'>
       <div className='menu-flexer' onClick={() => {setPopupVisible3(true)}}>
          <AiOutlinePlus/>
        <button>Manager Folders</button>
        </div>
       </div>
         <TreeView
        id='tree-view'
          ref={treeViewRef}
          items={navigation}
          keyExpr={'path'}
          selectionMode={'single'}
          focusStateEnabled={false}
          expandEvent={'click'}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          searchEnabled={true}
          width={'100%'}
        /> 
      </div>
    </div>
        // <FileManager
        //  >
        //   <Permissions
        //     create={true}
        //     copy={true}
        //     move={true}
        //     delete={true}
        //     rename={true}
        //     // upload={true}
        //     download={true}>
        //   </Permissions>
        // </FileManager>
  );
}
