import { useState, useEffect } from "react";
import CardActivity from "../component/CardActivity";

function MainActivity() {
  const [activities, setActivities] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [isSetTheme, setIsSetTheme] = useState(false)

  const apiKey = "YOUR_VALID_API_KEY";

  async function fetchDetails() {
    
    try {
    const response = await fetch('https://todoapp-api-eight.vercel.app/activity', {
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + apiKey
    }
    });
    if (response.status === 401) {
    console.error('Unauthorized, Please check your token');
    return;
    }
    const data = await response.json();
    setActivities(data.activity);
    } catch (error) {
    console.error(error);
    }
    
    }

  useEffect(() => {
    fetchDetails();
  }, []);

  function handleChangeTodo(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues({ ...formValues, [name]: value });
  }

  function handleKeyPress(e) {

    const json2 = JSON.stringify({
      id: '',
      task : formValues.activity
    });

    if(e.key === 'Enter') {
      fetch('https://todoapp-api-eight.vercel.app/activity', {
        method: "POST",
        body: json2,
        headers: {
          "Content-type": "application/json",
          'Authorization': 'Bearer ' + apiKey
        },
      })
        .then((response) => {
          if (response.status !== 201) {
              return;
          } else {
              return response.json();
          }
        })
        .then((data) => {
          setActivities([...activities, data]);
          fetchDetails();
        })
    }
  }


  const deleteActivity = (id) => {
    fetch(`https://todoapp-api-eight.vercel.app/activity/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        'Authorization': 'Bearer ' + apiKey
      },
    })
      .then((response) => {
        fetchDetails(response);
      })
  };


  function switchTheme() {
  setIsSetTheme(!isSetTheme)
  }

  const dataResult = 
  activities.filter(task => task.id).length;

  function sortByActive(){
    setActivities([...activities].sort((a, b) => !b.done - !a.done));
  }

  function sortByCompleted(){
    setActivities([...activities].sort((a, b) => b.done - a.done));
  }

  function sortByAll(){
    setActivities([...activities].sort((a, b) => a.id - b.id));
  }

  function clearCompleted(){
    const completed = [...activities].filter(task => task.done)
    completed.map(tasks => 
    fetch(`https://todoapp-api-eight.vercel.app/${tasks.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data =>{
      setActivities(completed)
      fetchDetails()
    })
  ) 
  }

  const spans = document.querySelectorAll("span");

  for (const span of spans) {
      span.addEventListener("click", function() {
          for (const otherSpan of spans) {
              otherSpan.classList.remove("active");
          }
          this.classList.add("active");
      });
  }

  return (
    <div>

      <div id="header"  className={isSetTheme ? "dark" : ""}>
        <h1 data-cy="activity-title">Todo </h1>
        <button className="icon-switch" onClick={switchTheme}>
          {isSetTheme ?
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
              <path
                fill="#FFF"
                fillRule="evenodd"
                d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
              />
            </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <path 
            fill="#FFF" 
            fillRule="evenodd" 
            d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>}
          </button> 
      </div>

      <div id="main" className={isSetTheme ? "dark" : ""}>

        <div className="activity-wrap">

          <div className='activity-head'>
            <label className='checkbox-disable'>
                <input className='check' type="checkbox" />
                <span className="checkmark" ></span>
            </label>

            <input
            type='text' 
            className='text-task' 
            name='activity'
            placeholder="Create a new a todo.."
            autoFocus
            onKeyPress={(e) => handleKeyPress(e)}
            onChange={(e) => handleChangeTodo(e)}/> 
          </div>

          <ul className='activity-main'>
              {activities && Object.values(activities).map((item , index) => 
                <CardActivity
                  key={index}
                  index={index}
                  item={item}
                  id={item.id} 
                  activities={activities}
                  setActivities={setActivities}
                  isSetTheme={isSetTheme}
                  fetchDetails={fetchDetails}
                  deleteActivity={deleteActivity}/>)
                }
          </ul>
                

          <div className='activity-footer'>
                <span style={{ cursor: 'none', pointerEvents: 'none'}}>{dataResult} Items Left</span>
                <div className='btn-sort'>
                <div className="span-sort">
                  <span onClick={() => sortByAll()}>All</span>
                  <span onClick={() => sortByActive()}>Active</span>
                  <span onClick={() => sortByCompleted()}>Completed</span>
                </div>
                </div>
                <span onClick={() => clearCompleted()}> Clear Completed</span>
          </div>
        </div>
          
          <span className="note"> Drag and drop to reorder list </span>
          
      </div>
    </div>
  );
}

export default MainActivity;
