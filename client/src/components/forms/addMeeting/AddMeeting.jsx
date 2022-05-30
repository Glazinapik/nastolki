import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewMeeting } from "../../../redux/actions/meetingAction";

function AddMeeting() {

    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch();

    const [form, setForm] = useState({});

    console.log(form)

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setForm(prev=> ({...prev, [`${e.target.name}`]: e.target.value}));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createNewMeeting(form,navigate));
        setForm({});
    }

  
    return (
      <div className="d-flex justify-content-center">
        <form
          onSubmit={submitHandler}
          className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3"
        >
          <legend className="text-center mb-4">Создание новой встречи</legend>
          <div className="mb-3">
            <div>Введите название игры:</div>
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
            <div>Введите адрес, по которому вы планируете провести Вашу встречу :</div>
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
            <div>Введите дату и время Вашей встречи :</div>
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
            <div>Введите количество игроков :</div>
            <input
              onChange={changeHandler}
              value={form.amount}
              className="form-control"
              type="text"
              name="amount"
              placeholder="Количество игроков"
            />
          </div>
  
          <button className="btn btn-primary">
            Создать встречу !
          </button>
        </form>
      </div>
    );
  }
  
  export default AddMeeting;
