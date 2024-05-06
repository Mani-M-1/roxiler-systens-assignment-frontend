import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CreateTask = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();


    const [form, setForm] = useState({title: '', price: '', description: '', category: '', image: ''})


    const [showErr, setShowErr] = useState(false);

    const handleOnChangeInput = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        
    }



    const handleOnSubmit = async (event) =>  {
        event.preventDefault();
        console.log(form)

        if (form.title !== "" && form.price !== "" && form.description !== "", form.category !== "", form.image !== "") {
            const {price, ...rest} = form;

            const url = `${apiUrl}/tasks`
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...rest, price: parseFloat(price), sold: false, dateOfSale: new Date()})
            }

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
                <input onChange={handleOnChangeInput} id='title' type='text' className='create-task-page__inputs' placeholder='Enter Title' name="title"  />    
                
                
                <label htmlFor='price' className='create-task-page__labels'>
                    Price
                </label>
                <input onChange={handleOnChangeInput} id='price' type='text' className='create-task-page__inputs' placeholder='Enter Price' name="price"  />    
                
                
                <label htmlFor='description' className='create-task-page__labels'>
                    Description
                </label>
                <textarea onChange={handleOnChangeInput} id='description' type='text' rows={4} className='create-task-page__inputs' placeholder='Enter Description' name="description"></textarea>   
                
                
                <label htmlFor='category' className='create-task-page__labels'>
                    Category
                </label>
                <input onChange={handleOnChangeInput} id='category' type='text' className='create-task-page__inputs' placeholder='Enter Category' name="category"  />    
                
                
                
                <label htmlFor='image' className='create-task-page__labels'>
                    Image Url
                </label>
                <input onChange={handleOnChangeInput} id='image' type='text' className='create-task-page__inputs' placeholder='Provide Image Url' name="image"  />  


                {showErr && <p className='create-task-page__err-msg'>*Please Enter all fields</p>}


                <button type='submit' className='create-task-page__submit-btn'>
                    Submit     
                </button>  
            </form> 
        </div>
    )
}


export default CreateTask;