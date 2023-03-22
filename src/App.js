
import React, { useCallback, useState } from 'react';
import './App.css';
import { DropdownComboBox } from './Component/Dropdown';

const animals = [
  "лев",
  "тигр",
  "панда",
  "обезьяна",
  "слон",
  "жираф",
  "крокодил",
  "кенгуру",
  "кит",
  "медведь",
  "волк",
  "лиса",
  "енот",
  "бобр",
  "буйвол",
  "верблюд",
  "лама",
  "кабан",
  "койот",
  "кролик",
  "муравьед",
  "бегемот",
  "белый медведь",
  "дельфин",
  "зебра",
  "носорог",
  "лось",
  "росомаха",
  "черепаха",
  "червь",
  "змея",
  "ящерица",
  "лягушка",
  "жаба",
  "стрекоза",
  "бабочка",
  "пчела",
  "муха",
  "таракан",
  "жук",
  "гусеница",
  "черная вдова",
  "скорпион",
  "муравей",
  "крыса",
  "мышь",
  "белка",
  "барсук",
  "хорек хорек хорек хорек хорек хорек хорек хорек хорек хорек хорек хорек хорек хорек хорек хорек хорек хорек хорек хорек",
  "комар",
  "слепень",]

function App() {
  const [values,setValues] = useState([])
  const[id,setId] = useState(0)

  // useState(() => {setInputValue("888")},[id])


 
   const changeDropdown = useCallback( (props) => {
      console.log("changeDropdown in App",props.value)
      setValues(props.value)
   },[])
  return (
    <div>
      <div style={{padding:'50px', paddingBottom:"0px"}}>
        <DropdownComboBox  options={animals || []} onChange={changeDropdown} caption={"Список"} values={values||[]}></DropdownComboBox>
      </div>
    </div>
  );
}

export default App;
