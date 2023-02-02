import axios from 'axios';


function CardActivity({index, item, id, activities, setActivities, isSetTheme, fetchDetails, deleteActivity}) {


    async function updateCheck() {
      const response = await axios.get(`https://todoapp-api-eight.vercel.app/activity/${id}`);
      const item = response.data;
      const updatedCheck = { ...item, done: !item.done };
      await axios.put(`https://todoapp-api-eight.vercel.app/activity/${id}`, updatedCheck);
      setActivities(
        activities.map(el => (el.id === id ? updatedCheck : el))
      );
      fetchDetails();
    }

    const handleDragStart = (e, index) => {
      e.dataTransfer.setData("index", index);
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    const handleDrop = (e, index) => {
      e.preventDefault();
      const dragIndex = e.dataTransfer.getData("index");
      const dragActivity = activities[dragIndex];
      let newActivities = [...activities];
      newActivities.splice(dragIndex, 1);
      newActivities.splice(index, 0, dragActivity);
      setActivities(newActivities);
    };
  
    const handleTouchStart = (e, index) => {
      e.target.setAttribute("data-index", index);
    };
    
    const handleTouchMove = (e) => {
    };
    
    const handleTouchEnd = (e, index) => {
      const dragIndex = e.target.getAttribute("data-index");
      const dragActivity = activities[dragIndex];
      let newActivities = [...activities];
      newActivities.splice(dragIndex, 1);
      newActivities.splice(index, 0, dragActivity);
      setActivities(newActivities);
    };


  return (
      <li
        className={`card-activity ${isSetTheme ? "dark" : ""} ${item.done ? "done" : ""}`}
        data-cy="activity-item"
        style={{ textDecoration: item.done ? "line-through" : null}}
        key={item.id}
        draggable={window.innerWidth >= 768}
        onDragStart={(e) => handleDragStart(e, index)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, index)}
        onTouchStart={(e) => handleTouchStart(e, index)}
        onTouchMove={handleTouchMove}
        onTouchEnd={(e) => handleTouchEnd(e, index)}
      >

                <div className='card-body'>
                  <label className='checkbox-circle'>
                    <input className='check' type="checkbox" onClick={() => updateCheck(item.id)} defaultChecked={item.done} />
                    <span className='checkmark'></span>
                  </label>
                  <p className="card-title" data-cy="activity-item-title">{item.task}</p>
                </div>

                <div className="delete-btn" data-cy="activity-item-delete-button" > 
                  <button className='delete-icon'
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteActivity(item.id)}}> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"><path fill="#9394a5" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                  </button>
                </div>
            </li>
  )
}

export default CardActivity