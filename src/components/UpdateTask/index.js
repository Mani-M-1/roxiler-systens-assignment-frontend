import './index.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateTask = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();

    const params = useParams()


    const [form, setForm] = useState({ title: '', price: '', description: '', category: '', image: '', sold: ''})


    const [showErr, setShowErr] = useState(false);

    const handleOnChangeInput = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        
    }



    const getTask = async () => {
        console.log(apiUrl)

        const url = `${apiUrl}/tasks/${params.id}`;
        console.log(url)
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            const {dateOfSale, ...rest} = data.task;
            setForm({...rest});
        }
    }

    useEffect(() => {
        getTask();
    }, []);

    



    const handleOnSubmit = async (event) =>  {
        event.preventDefault();
        console.log(form)


        if (form.title !== "" && form.price !== "" && form.description !== "" && form.category !== "" && form.image !== "") {
            const {price, sold, ...rest} = form;

            // Create a new Date object
            const currentDate = new Date();

            // Get the UTC date components
            const year = currentDate.getUTCFullYear();
            const month = currentDate.getUTCMonth() + 1; // Month starts from 0
            const day = currentDate.getUTCDate();
            const hours = currentDate.getUTCHours();
            const minutes = currentDate.getUTCMinutes();
            const seconds = currentDate.getUTCSeconds();

            // Create a UTC time string in the format: YYYY-MM-DDTHH:MM:SSZ
            const utcTimeString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}Z`;

            console.log(utcTimeString);



            const url = `${apiUrl}/tasks/${params.id}`
            const options = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...rest, price: parseFloat(price), sold: parseInt(sold), dateOfSale: utcTimeString})
            }

            console.log({...rest, price: parseFloat(price), sold: parseInt(sold), dateOfSale: utcTimeString})

            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                console.log(data);

                navigate('/');
            }
        }
        else {
            setShowErr(true);

            setTimeout(() => {
                setShowErr(false);
            }, 2000);
        }
    }

    return (
        <div className='create-task-page__bg-container'>
            {console.log(form)}
            <form className='create-task-page__form-item' onSubmit={handleOnSubmit}>
                <label htmlFor='title' className='create-task-page__labels'>
                    Title
                </label>
                <input onChange={handleOnChangeInput} id='title' type='text' className='create-task-page__inputs' placeholder='Enter Title' name="title" value={form.title} />    
                
                
                <label htmlFor='price' className='create-task-page__labels'>
                    Price
                </label>
                <input onChange={handleOnChangeInput} id='price' type='text' className='create-task-page__inputs' placeholder='Enter Price' name="price" value={form.price} />    
                
                
                <label htmlFor='description' className='create-task-page__labels'>
                    Description
                </label>
                <textarea onChange={handleOnChangeInput} id='description' type='text' rows={4} className='create-task-page__inputs' placeholder='Enter Description' name="description" value={form.description}></textarea>   
                
                
                <label htmlFor='category' className='create-task-page__labels'>
                    Category
                </label>
                <input onChange={handleOnChangeInput} id='category' type='text' className='create-task-page__inputs' placeholder='Enter Category' name="category" value={form.category} />    
                
                
                <label htmlFor='sold' className='create-task-page__labels'>
                    Sold
                </label>
                <select className='create-task-page__inputs' name='sold' value={form.sold} onChange={handleOnChangeInput}>
                    <option value={1}>true</option>
                    <option value={0}>false</option>
                </select>
                
                
                <label htmlFor='image' className='create-task-page__labels'>
                    Image Url
                </label>
                <input onChange={handleOnChangeInput} id='image' type='text' className='create-task-page__inputs' placeholder='Provide Image Url' name="image" value={form.image} />  


                {showErr && <p className='create-task-page__err-msg'>*Please Enter all fields</p>}


                <button type='submit' className='create-task-page__submit-btn'>
                    Submit     
                </button>  
            </form> 
        </div>
    )
}


export default UpdateTask;