import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "66003a36f7988aeec5bc528d",
          "user": "65ffc7f0dd937add6c923a83",
          "title": "hello1",
          "description": "bggsnhchsushucsi",
          "tag": "hyy",
          "date": "2024-03-24T14:35:34.272Z",
          "__v": 0
        }
      ]
    const [notes,setnotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState