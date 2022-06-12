import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAnotherUserFromServer } from "../../redux/actions/anotherUserAction";
import { editUser } from "../../redux/actions/userAction";


function EditProfile() {

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500)
  })

  useEffect(() => {
    dispatch(getAnotherUserFromServer(id))
  }, [])

  const user = useSelector(state => state.user);
  const anotheruser = useSelector(state => state.anotheruser);

  const [userEdit, setUserEdit] = useState(user ? user : {});
  const [file, setFile] = useState(null);

  const changeHandler = (e) => {
    setUserEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const avatarHandler = (e) => {
    setFile(e.target.files[0])
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (file) dispatch(editUser({ ...userEdit, file }, navigate));
    else dispatch(editUser({ ...userEdit }, navigate));
  };

  return (
    <>
      {isLoading ? <div className="profile user-profile">

      </div> :
        <div>
          {anotheruser?.id == user.id ?
            <form onSubmit={submitHandler}>
              <div className="profile">

                <div className="flexy">
                  <div className="avanar">
                    <div className="box">
                      <img className="img imgUser" src={`http://localhost:3001${user.photo}`} alt="" />
                    </div>
                    <input onChange={avatarHandler} type="file" className="form-control upload" name="file" />
                  </div>
                  <div className="info">
                    <div>
                      <input onChange={changeHandler} className="form-control input" type="text" placeholder="Имя" name="userName" value={userEdit.userName} />
                    </div>
                    {userEdit?.gender === "Мужской" ? (
                      <div>
                        <label >Пол:</label>
                        <input onChange={changeHandler} type="radio" id="contactChoice1" name="gender" value="Мужской" checked />

                        <label htmlFor="contactChoice1">Мужской</label>

                        <input onChange={changeHandler} type="radio" id="contactChoice2" name="gender" value="Женский" />
                        <label htmlFor="contactChoice2">Женский</label>
                      </div>
                    ) : userEdit?.gender === "Женский" ? (
                      <div>
                        <label >Пол:</label>
                        <input onChange={changeHandler} type="radio" id="contactChoice1" name="gender" value="Мужской" />

                        <label htmlFor="contactChoice1">Мужской</label>

                        <input onChange={changeHandler} type="radio" id="contactChoice2" name="gender" value="Женский" checked />
                        <label htmlFor="contactChoice2">Женский</label>
                      </div>
                    ) : (
                      <div>
                        <label >Пол:</label>
                        <input onChange={changeHandler} type="radio" id="contactChoice1" name="gender" value="Мужской" />

                        <label htmlFor="contactChoice1">Мужской</label>

                        <input onChange={changeHandler} type="radio" id="contactChoice2" name="gender" value="Женский" />
                        <label htmlFor="contactChoice2">Женский</label>
                      </div>
                    )

                    }
                    <div>

                      <input onChange={changeHandler} className="form-control input line" type="text" placeholder="Город" name="city" value={userEdit.city} />
                      <input onChange={changeHandler} className="form-control input line" type="number" placeholder="Возраст" name="dateborn" value={userEdit.dateborn} />

                    </div>

                    <div className="div3">
                      <textarea onChange={changeHandler} className="form-control input area" type="text" placeholder="Обо мне" name="info" value={userEdit.info} />
                    </div>
                    <button className="btn btn-primary button" type="submit">Сохранить</button>
                  </div>
                </div>
              </div>
            </form>
            :
            (<div className="profile">

              <div className="flexy">
                <div className="avanar">
                  <div className="box">
                    <img className="imgUser" src={`http://localhost:3001${anotheruser?.photo}`} alt="" />
                  </div>
                </div>
                <div className="info">
                  <div>
                    <label >Имя: <span className="span3">{anotheruser?.userName}</span></label>
                  </div>
                  <div>
                    {anotheruser?.city ? <label >Город: <span className="span3">{anotheruser?.city}</span></label> : <label >Город: не указан</label>}
                  </div>
                  <div>
                    {anotheruser?.gender !== 'null' ? <label >Пол: <span className="span3">{anotheruser?.gender}</span></label> : <label >Пол: не указан</label>}
                  </div>
                  <div>
                    {anotheruser?.dateborn ? <label >Возраст: <span className="span3">{anotheruser?.dateborn}</span></label> : <label >Возраст: не указан</label>}
                  </div>
                  <div>
                    {anotheruser?.info ? <label >Обо мне: <div><span className="span3">{anotheruser?.info}</span></div></label> : <label >Обо мне: нет информации</label>}
                  </div>
                </div>
              </div>
            </div>)
          }
        </div>
      }

    </>
  )
}
export default EditProfile;
