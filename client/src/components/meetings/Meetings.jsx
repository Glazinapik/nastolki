function Meetings() {
    
    ymaps.ready(init);
    function init(){
        const myMap = new ymaps.Map("mymap", {
            center: [55.76, 37.64],
            zoom: 7
        });
    }

    return (
        <>
      <p className="text-center">Meetings</p>
      <div id="mymap"></div>
      </>
    );
  }
  
  export default Meetings;