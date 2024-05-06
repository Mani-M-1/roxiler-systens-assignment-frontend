import { useEffect, useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';



const monthsArr = [
    {
        id: '1',
        month: "January",
        value: "01"
    },
    {
        id: '2',
        month: "February",
        value: "02"
    },
    {
        id: '3',
        month: "March",
        value: "03"
    },
    {
        id: '4',
        month: "April",
        value: "04"
    },
    {
        id: '5',
        month: "May",
        value: "05"
    },
    {
        id: '6',
        month: "June",
        value: "06"
    },
    {
        id: '7',
        month: "July",
        value: "07"
    },
    {
        id: '8',
        month: "August",
        value: "08"
    },
    {
        id: '9',
        month: "September",
        value: "09"
    },
    {
        id: '10',
        month: "October",
        value: "10"
    },
    {
        id: '11',
        month: "November",
        value: "11"
    },
    {
        id: '12',
        month: "December",
        value: "12"
    }
]



const Home = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const [filter, setFilter] = useState({searchValue: '', selectedMonth: monthsArr[2].value})


    const getAllTasks = async (searchValue, selectedMonth) => {
        console.log(apiUrl)


        console.log(filter)

        setFilter({
            ...filter,
            searchValue: searchValue,
            selectedMonth: selectedMonth
        })

        
        const url = `${apiUrl}/tasks?search_q=${searchValue}&month=${selectedMonth}&offset=${0}`;
        console.log(url)
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            setTasks(data.tasks);
        }
    }

    useEffect(() => {
        getAllTasks(filter.searchValue, filter.selectedMonth);
    }, []);
    


    const handleOnSelect = (event) => {
        console.log(event.target.value);
       
        getAllTasks(filter.searchValue, event.target.value);
    }


    const handleOnChangeSeachInput = (event) => {
        console.log(event.target.value);
        

        getAllTasks(event.target.value, filter.selectedMonth);
    }


    const handleOnclickAddTaskBtn = () => {
        navigate('/create-task')
    }


    const TaskItem = (props) => {
        const {task} = props;
        const {id, title, price, description, category, image, sold, dateOfSale} = task;

        const handleOnclickTaskItem = () => {
            navigate(`/update-task/${id}`);
        }
        
        
        return (
            <tr className='home-page__table-row' onClick={handleOnclickTaskItem}>
                <td className='home-page__table-data'>
                    {id}
                </td>
                <td className='home-page__table-data'>
                    {title}
                </td>
                <td className='home-page__table-data'>
                    {description}
                </td>
                <td className='home-page__table-data'>
                    {price}
                </td>
                <td className='home-page__table-data'>
                    {category}
                </td>
                <td className='home-page__table-data'>
                    {sold === 1 ? "true" : "false"}
                </td>
                <td className='home-page__table-data'>
                    {image}
                </td>
            </tr>
        )
    }

    const MonthItem = (props) => {
        const {eachMonth} = props;
        const {id, month, value} = eachMonth;

        return (
            <option value={value}>
                {month}
            </option>
        )

    }


    return (
        <div className='home-page__bg-container'>
            <div className='home-page__search-wrapper-and-filter-wrapper'>
                <div className='home-page__search-and-add-btn-wrapper'>
                    <input className='home-page__search-input' type='search' placeholder='Search by title, description or category' name='searchValue' onChange={handleOnChangeSeachInput} />
                    <button  type='button' className='home-page__add-task-btn' onClick={handleOnclickAddTaskBtn}>
                        Add Task +
                    </button>
                </div>

                <select className='home-page__select-item' name='selectedMonth' value={filter.selectedMonth} onChange={handleOnSelect}>
                    <option value="">Select Option</option>
                    {monthsArr.map(eachMonth => <MonthItem key={eachMonth.id} eachMonth={eachMonth}/>)}
                </select>
            </div>

            <table className='home-page__table-item'>
                <thead className='home-page__table-head'>
                    <tr>
                        <td className='home-page__table-data'>
                            ID 
                        </td>
                        <td className='home-page__table-data'>
                            Title 
                        </td>
                        <td className='home-page__table-data'>
                            Description 
                        </td>
                        <td className='home-page__table-data'>
                            Price 
                        </td>
                        <td className='home-page__table-data'>
                            Category 
                        </td>
                        <td className='home-page__table-data'>
                            Sold
                        </td>
                        <td className='home-page__table-data'>
                            Image
                        </td>
                    </tr>
                </thead>

                <tbody className='home-page__table-body'>
                    {tasks.map(task => <TaskItem key={task.id} task={task}/>)}
                </tbody>
            </table>
        </div>
    )
}


export default Home;