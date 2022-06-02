import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUser, signUp } from "../../redux/actions/userAction";


function EditProfile () {
  const user = useSelector(state => state.user)
  console.log(user, 1111111111111111);
  const [userEdit, setUserEdit] = useState(user?user:{});
  const [file, setFile] = useState(null) // avatar
  const navigate = useNavigate();

  const changeHandler = (e) => {
    // console.log(userEdit);
    setUserEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(userEdit);
  };
  const avatarHandler = (e) => {
    setFile(e.target.files[0])
  }

  // useEffect(() => {

  //   console.log(userEdit);
  // })

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if(file) dispatch(editUser({...userEdit, file}, navigate)); // FIX: change with non file
    else dispatch(editUser({...userEdit}, navigate)); // FIX: change with non file
  };
  // const handleInputs = useCallback((e) => {
  //   if (e.target.type === 'file') {
  //     setUserEdit((prev) => ({
  //       ...prev,
  //       photo.
  //       [e.target.name]: e.target.value,
  //       file: e.target.files[0],
  //     }));
  //   } else {
  //     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  //   }
  // }, []);
  return(
    <>
    <form onSubmit={submitHandler}>
    <div className="aaa">

<div className="flexy">
  <div className="avanar">
    <div className="boxForImg img2">
      <img className="img img2" src={`http://localhost:3001${user.photo}`} alt=""/>
    </div>
  <input onChange={avatarHandler}  type="file" className="form-control upload" name="file"/>
  </div>
  <div className="info">
    <div>
     <input onChange={changeHandler} className = "form-control input" type="text" placeholder="Имя" name="userName" value={userEdit.userName}/>
    </div>
{userEdit?.gender === "Мужской" ? (
  <div>
  <label >Пол:</label>
  <input onChange={changeHandler} type="radio" id="contactChoice1" name="gender" value="Мужской" checked/>
  
  <label htmlFor="contactChoice1">Мужской</label>

  <input onChange={changeHandler} type="radio" id="contactChoice2" name="gender" value="Женский"/>
  <label htmlFor="contactChoice2">Женский</label>
  </div>
) : userEdit?.gender === "Женский" ? (
  <div>
  <label >Пол:</label>
  <input onChange={changeHandler} type="radio" id="contactChoice1" name="gender" value="Мужской"/>
  
  <label htmlFor="contactChoice1">Мужской</label>

  <input onChange={changeHandler} type="radio" id="contactChoice2" name="gender" value="Женский" checked/>
  <label htmlFor="contactChoice2">Женский</label>
  </div>
) : (
  <div>
  <label >Пол:</label>
  <input onChange={changeHandler} type="radio" id="contactChoice1" name="gender" value="Мужской"/>
  
  <label htmlFor="contactChoice1">Мужской</label>

  <input onChange={changeHandler} type="radio" id="contactChoice2" name="gender" value="Женский"/>
  <label htmlFor="contactChoice2">Женский</label>
  </div>
)

}
  

    
    

    <div>

     <input onChange={changeHandler} className = "form-control input line" type="text" placeholder="Город" name="city" value={userEdit.city}/>
     <input onChange={changeHandler} className = "form-control input line" type="number" placeholder="Возраст" name="dateborn" value={userEdit.dateborn}/>

    </div>
  
    <div className="div3">
      <textarea onChange={changeHandler} className = "form-control input area" type="text" placeholder="Обо мне" name="info" value={userEdit.info}/>
    </div>
     <button className="btn btn-primary button"  type="submit">Сохранить</button>
  </div>
</div>
    </div>
      </form>
    
{/* 
      <div className="aaa bbb">

<div className="flexy">
  <div className="avanar">
    <div className="box">
      <img className="img2" src={user.file?user.file:"https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s375"} alt=""/>
    </div>
  </div>
  <div className="info">
    <div>
    <label >Имя: Имя пользователя</label>
    </div>
    <div>
    <label >Пол: пол</label>
    <label >Город: город</label>
    </div>
    <div>
    <label >Возраст: возраст</label>
    </div>
    <div>
    <label >Обо мне:</label>
    <div>
      ываываыввава
    </div>
    </div>
  </div>
</div>
    </div> */}
    </>
  )
}
export default EditProfile
