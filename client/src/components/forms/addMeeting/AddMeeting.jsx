import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewMeeting } from "../../../redux/actions/meetingsAction";

function AddMeeting() {

  const dispatch = useDispatch();

  const [form, setForm] = useState({});

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm(prev => ({ ...prev, [`${e.target.name}`]: e.target.value }));
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNewMeeting(form, navigate));
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
            placeholder="Адрес (город, улица, дом)"
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

      <img className='picture' src="/img/fon13.jpg" alt="" />
    </div>

  );
}

export default AddMeeting;
