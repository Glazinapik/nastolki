// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
// import { getUserFromServer } from "../../redux/actions/userAction"

function EditProfile () {

// const user = useSelector(state => state.meeting.ower_id)
  return(
    <>
<div className="flexy">
  <div className="avanar">
    <div className="box">
      <img className="img2" src="https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s375" alt=""/>
    </div>
  <input  type="file" className="form-control upload" name="photo"/>
  </div>
  <div className="info">
    <div>
     <input className = "form-control input" type="text" placeholder="Имя" />
    </div>
    <div className="div3">
      <textarea className = "form-control input area" type="text" placeholder="Обо мне" />
    </div>
     <button className="btn btn-primary button"  type="submit">Сохранить</button>
  </div>
</div>
    </>
  )
}
export default EditProfile
