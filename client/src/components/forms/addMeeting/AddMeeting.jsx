import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewMeeting } from "../../../redux/actions/meetingAction";

function AddMeeting() {

    const [form, setForm] = useState({});
    const dispatch = useDispatch()


    const changeHandler = (e) => {
        setForm(prev=> ({...prev, [`${e.target.name}`]: e.target.value}));
    }

    const submitHandler = () => {
        dispatch(createNewMeeting(form))
        console.log(form, '<----------------')
        setForm({});
    }

  
    return (
      <div className="d-flex justify-content-center">
        <form
          onSubmit={submitHandler}
          className="form"
        >
          <legend className="text-center mb-4"><h1>Создание новой встречи</h1></legend>
          <div className="mb-3">
            <input
              onChange={changeHandler}
              value={form.title}
              className="form-control"
              type="text"
              name="title"
              placeholder="Название игры"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={changeHandler}
              value={form.place}
              className="form-control"
              type="text"
              name="place"
              placeholder="Адрес"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={changeHandler}
              value={form.date}
              className="form-control"
              type="datetime-local"
              name="date"
              placeholder="Дата и время встречи"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={changeHandler}
              value={form.amount}
              className="form-control"
              type="text"
              name="amount"
              placeholder="Количество игроков"
            />
          </div>
  
          <button type="submit" className="btn btn-primary button">
            Создать встречу !
          </button>
        </form>
        <img className='photo2' src="/img/fon13.jpg" alt="" />
      </div>
    );
  }
  
  export default AddMeeting;
