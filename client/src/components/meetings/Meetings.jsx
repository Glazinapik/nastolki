import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeetingsFromServer } from "../../redux/actions/meetingsAction";
import { useNavigate } from "react-router-dom";
import Cardy from "../Cardy/Cardy";
const ymaps = window.ymaps



function Meetings() {
  const dispatch = useDispatch();
  
  const meetings = useSelector(state => state.meetings);


  const navigate = useNavigate();

  const linkHandler = (link) => {
    navigate(link)
  }


  useEffect(() => {
    dispatch(getMeetingsFromServer())
    if (meetings.length){ 
      console.log('массив не пустой');
      ymaps?.ready(init())
    } else {
      console.log('массив пустой');   
    }
  }, [])
  

 const sortedMeetengs = meetings.sort((a, b) => new Date(a.date)-new Date(b.date))


  const [searchInput, setSearchInput] = useState('')
  const [searchByGame, setSearchByGame] = useState('')
  
  const searchBySortedMeetings = useMemo(() => {

    console.log(new Date(meetings[0]?.date) > new Date(), '==========');
    const sortedMeetengs = meetings.filter(meeting => new Date(meeting.date) > new Date()).sort((a, b) => new Date(a.date)-new Date(b.date))
    if(searchInput && !searchByGame)return sortedMeetengs.filter(meeting => meeting.place.toLowerCase().includes(searchInput.toLowerCase()))
    if(searchByGame && !searchInput)return sortedMeetengs.filter(meeting => meeting.title.toLowerCase().includes(searchByGame.toLowerCase()))
    if(searchByGame && searchInput)return sortedMeetengs.filter(meeting => (meeting.title.toLowerCase().includes(searchByGame.toLowerCase())&& meeting.place.toLowerCase().includes(searchInput.toLowerCase())))

    return meetings
  }, [searchInput, searchByGame, meetings ])


  useEffect(() => {
    dispatch(getMeetingsFromServer())
    if (meetings.length){ 
      ymaps.ready(() => init(meetings, linkHandler))
    }
  }, [meetings.length])
  
  
  return (
    <>
      {meetings.length  ? <div className="meetings">
        {meetings.length ? <div id="mymap"></div> : <div>LOADING</div>}
        <div className="title2" ><h1 >ближайшие события</h1><div className="meet">
        {searchBySortedMeetings.length ?
            searchBySortedMeetings.map(meeting => <Cardy key={meeting.id} {...meeting}></Cardy>)
            :
            <div className="textnull">В ближайшее время нет новых встреч 😟</div>   
          }
          </div>
          <div className="sss">
          <input value={searchInput} onChange={e => setSearchInput(e.target.value)} className="form-control line2" type="text" placeholder="Поиск по адресу" />
          <input value={searchByGame} onChange={e => setSearchByGame(e.target.value)} className="form-control line2" type="text" placeholder="Поиск по игре"/>
          </div>
        </div>
       
      </div> : <div>LOADING</div>}

    </>
  );
}


export default Meetings;
