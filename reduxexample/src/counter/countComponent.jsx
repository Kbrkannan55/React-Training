// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { addList,  removeList } from './listSlice';

// const ListManipulation = () => {
//   const liststore = useSelector((state) => state.liststore);
//   const dispatch = useDispatch();
  
//   const [newList, setNewList] = useState('');

//   const addNewList = () => {
//     const newlistelmt = { id: Date.now(), text: newList };
   
//     dispatch(addList(newlistelmt));
//     setNewList('');
//   };

//   const removeExistingList = (listId) => {
//     dispatch(removeList(listId));
//   };

//   return (
//     <div>
//             <br></br>
//       <br></br>

//       <input
//         type="text"
//         value={newList}
//         onChange={(e) => setNewList(e.target.value)}
//       />
//       <br></br>
//       <br></br>
//       <button onClick={addNewList}>Add New List Item</button>
//       <ul>
//         {liststore.map((list) => (
//           <li key={list.id}>
//             {list.text}
//             <button onClick={() => removeExistingList(list.id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ListManipulation;
