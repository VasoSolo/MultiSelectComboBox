import React , {useEffect, useState} from "react";


export function DropdownComboBox (props) {
   const {options, onChange, caption, values, labelClassName, buttonClassName, componentClassName, key} = props || {}
  // const ref = useRef(null)

    // const [editValue,setEditValue] = useState("")
    const [isOpen, setOpen] = useState(false);
    const [array,setArray] = useState(options.sort()||[])

    const[indexDuplicationItem,setIndexDuplicationItem] = useState("")
    
    const [inputValue,setInputValue] = useState("")

    // const [isEmpty,isIsEmpty] = useS

    const [selectedArray, setSelectedArray] = useState(values || [])
    const [filteredArray,setFilteredArray] = useState(array||[])
    const [isFocusedOnElement,setIsFocusedOnElement] = useState(false)
    const [isHoverOnItemInList,setIsHoverOnItemInList] = useState(array.map(() => "0"))
    const [indexHoverItemInList,setIndexHoverItemInList] = useState(-1)
    // console.log("isHoverOnItemInList",isHoverOnItemInList)
    const inputRef = React.createRef()
    const element = React.createRef()
    const dropList = React.createRef()

    useEffect(() => {
      setInputValue("")
    },[key])
    // console.log("inputeValue",inputeValue)
    // useEffect(() => {
    //   // console.log("useEffect inputeValue",inputeValue)
    //   console.log("inputRef.current.value",inputRef.current.value)
    //   setInputeValue(inputRef.current.value)
    // },[inputRef.current.value])


    useEffect(() => {
      const timeout = setTimeout(() => {
        // setColor('red');
        setIndexDuplicationItem("")
      }, 1000);
      return () => clearTimeout(timeout);
    }, [indexDuplicationItem]);

    useEffect(()=> {setSelectedArray(values)},[values])
    // событие на клик вне элемента
    useEffect(() => {
      function handleClickOutside(event) {
        if (element.current && !element.current.contains(event.target)) {
          setOpen(false)
        }
      }  
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [element]);

    //закрывать список, если после фильтрации он пуст
    useEffect(() => {
      if (filteredArray.length===0){
        setOpen(false)
      }
    },[filteredArray])

    // useEffect(() => {setO},[array])

    // useEffect(() => {
    //   if (indexHoverItemInList >= 0 )
    //     inputRef.current.value = filteredArray[indexHoverItemInList]
    // },[indexHoverItemInList])

    useEffect(() => {setIndexHoverItemInList(-1)},[isOpen])

    // useEffect(() => {
    //   onChange({value:selectedArray})
    // },[selectedArray])

    //фильтрация выпадающего списка при вводе текста
    const handleInputChange = (e) => {
      setInputValue(e.target.value)
      console.log(e.target.value)
      const value = e.target.value;
      setFilteredArray( filterForList(value))
      if (value.length > 1 && filteredArray.length > 0){
        setOpen(true);
      }
      else{
        if (value.length === 0)
          setOpen(false)
      }     
    };

    //открытие выпадающего списка
    const onOpen = () => {
      setFilteredArray( filterForList(inputValue))
      if (filteredArray.length>0)
        setOpen(prev => !prev);
      inputRef.current.focus()
    }

    //добавление элемента из списка или ввод нового элемента
    const onSelect = (selectedItem) => {
      const selectedItemTrim = selectedItem.trim().replace(/\s+/g, ' ') 
      const index = selectedArray.indexOf(selectedItemTrim)
      if (selectedItemTrim === "")
        setInputValue("")
        else
      {if (index < 0){
        onChange({value:[...selectedArray, selectedItemTrim]})
        setOpen(prev => !prev)
        inputRef.current.focus()
        setInputValue("")
      }else {
          setInputValue(selectedItemTrim)
          console.log(index)
          setIndexDuplicationItem(selectedItemTrim)
        }
      }
    }

    //удаление элемента из панели выбранных элементов
    const onDelete = (deleteItem,event) => {
      event.stopPropagation()
      // setSelectedArray(prev => [...prev.filter(item => item !== deleteItem)])
      onChange({value:[...selectedArray.filter(item => item !== deleteItem)]})
    }


    //фильтрация для списка
    const filterForList = (findString) => {
      const filtred = array.filter(i => i.toLowerCase().includes(findString.toLowerCase())).sort()
      return filtred
    }

    //коррекция элемента из панели выбранных элементов
    const handleEdit = (item, event) => {

      setFilteredArray( filterForList(item));
      event.stopPropagation()
      setOpen(true)
      onDelete(item,event)
      // inputRef.current.value = item
      setInputValue(item)
      inputRef.current.focus()
      // setEditValue(item)
    }

    //событие нажатие клавиши в input
    const handleKeyDown = (event) => {
      if (event.key === "Enter"){
        if (inputValue !== ""){
          onSelect(inputValue)
          setOpen(false)
        }          
      }



      // if (event.key === "ArrowDown" && inputRef.current.value.length>4){
      //   setOpen(true)
      //   if (indexHoverItemInList === filteredArray.length - 1){
      //     setIndexHoverItemInList(0)
      //   }
      //   else{
      //     setIndexHoverItemInList(prev => prev + 1)
      //   }
      //   dropList.current.scrollIntoView()
      //   // inputRef.current.value = filteredArray[indexHoverItemInList]
      // }
      // if (event.key === "ArrowUp" && isOpen){
      //   // setOpen(true)
      //   if (indexHoverItemInList === 0){
      //     setIndexHoverItemInList(filteredArray.length-1)
      //   }
      //   if (indexHoverItemInList !== 0 ){
      //     setIndexHoverItemInList(prev => prev - 1)
      //   }
      //   // inputRef.current.value = filteredArray[indexHoverItemInList]
      // }
    }

    //переключатель фокуса в выпадающем списке
    const toggleIsHoverOnItemInList = (index) => {
      setIndexHoverItemInList(index)
    }
    
    return (
      <div className={componentClassName} ref={element} style={{width: '100%', zIndex:"100"}}>
        <div className="field" onMouseEnter={() => setIsFocusedOnElement(true)} onMouseLeave={() => setIsFocusedOnElement(false)} style={{ transition: "border-color 0.3s ease-out", border: isOpen?"2px solid #266dc2":isFocusedOnElement?"2px solid #b8bdce":"2px solid #e6eaf0", borderRadius:"2px",}}>
          <div style={{}}>
            <label style={{marginLeft:"16px", font:"12px", color:"#b8bdce"}}>{caption}</label>
            <div style={{display: 'flex', "justifyContent": "space-between",  minHeight: "45px", marginRight:"10px", marginLeft:"10px", marginBottom:"10px"}}>
              {/* панель выбранных элементов */}
              <div style={{display: 'flex', 'flexFlow': 'wrap'}}>
                {
                  selectedArray.length > 0 && selectedArray.map((item) => (
                      <div key={item} style = {{ overflow:"hidden", display:"flex", alignItems: "center", transition:"border 0.1s ease", border: indexDuplicationItem===item?"1px solid red":"1px solid #e6eaf0", marginRight:"10px", marginTop:"5px", padding:"5px", borderRadius: "5px", boxShadow: '0 1px 10px rgb(107 105 105 / 40%)', cursor:"default"}} >
                          <div onClick={(event) => handleEdit(item,event)} >
                            <EditSvg></EditSvg>
                          </div>
                          <div style={{fontSize:"18px", marginLeft:"5px", marginRight:"5px",overflow:"hidden"}}>{item}</div>
                          <div onClick={(event) => onDelete(item, event)}>
                              <BucketSvg></BucketSvg>
                          </div>
                      </div>
                  ))
                }
              </div>
              {array.length > 0 && <div onClick={onOpen} style={{cursor:"pointer", }}>
                <ArrowSvg isOrientationUp={isOpen&&filteredArray.length}></ArrowSvg>
              </div>}
            </div>
          
            {/* {isOpen?"true":"false"}     {filteredArray.length} */}
            {/* поле ввода и коррекции */}
            <div style={{display:'flex', marginBottom:"10px"}} onClick={(event)=>(event.stopPropagation())}>
              
              <input onKeyDown={(event) => handleKeyDown(event)} 
                style={{'flexBasis': "85%",  outline:"none", fontSize:"18px", marginLeft:"10px", marginRight:"5px", border:"2px solid #e6eaf0", borderRadius:"2px", padding: "5px"  }} 
                ref={inputRef} onChange={handleInputChange}
                value={inputValue||""} 
              />
              <button 
                className={buttonClassName}
                onClick={() => {
                  if (inputValue !== '')
                    onSelect(inputValue)
                }}
                // style={{'flexBasis': "15%", marginRight:"10px"}}>Добавить</button>
                style={buttonStyle}>Добавить</button>
            </div>
          </div>
          {/* выпадаюший список */}
          {isOpen && filteredArray.length>0 &&  <div style={{position:"relative"}}>
              <div ref={dropList} style={{ maxHeight:"150px", overflowX:"hidden", overflowY:"scroll", width:"100%", zIndex:"100",position:"absolute",border: "2px solid #266dc2", borderTop:"none", right:"-2px" }}>
             {
                filteredArray.map((item,index) => (
                  <div onMouseEnter={() => toggleIsHoverOnItemInList(index)} onMouseLeave={() => toggleIsHoverOnItemInList(index)} key={item} onClick={() => onSelect(item)} style={{cursor:"pointer", padding:"4px 4px 10px 10px", fontSize:"18px",backgroundColor:indexHoverItemInList===index?"#b9d1e6":"white",  transition: "background-color 0.5s ease"}}>
                    {item}
                  </div>
                  ))  
              }
              </div>          
          </div>}
        </div>
      </div>
    );
  };

function EditSvg () {
  return (<svg style = {{marginRight: "2px", cursor:"pointer"}} width="13px" height="13px" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path fillRule="evenodd" clipRule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="#b8bdce" ></path>
      </g>
    </svg>
  )
}

function BucketSvg () {
  return (<svg  style = {{marginRight: "2px", cursor:"pointer"}} width="13px" height="13px" viewBox="0 0 24 24" fill="none" className="svgBucket">
  <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#b8bdce" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  )
}

function ArrowSvg ({isOrientationUp}) {
  return (<svg  fill="#7f7f7f" viewBox="0 0 1024 1024" width="30px" height="30px" transform={isOrientationUp?"rotate(180)":""} >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M759.2 419.8L697.4 358 512 543.4 326.6 358l-61.8 61.8L512 667z"></path>
    </g>
  </svg>
  )
}

const buttonStyle = {
  "backgroundColor": "#808080",
  border: "none",
  color: '#fff',
  padding: "12px 24px",
  "textAlign": "center",
  "textDecoration": "none",
  "display": "inline-block",
  "fontSize": "16px",
  "borderRadius": "4px",
  "boxShadow": "2px 2px 4px rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  "transition": "background-color 0.3s ease",
  marginRight:"10px"
}

