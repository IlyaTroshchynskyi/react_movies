import React from 'react';
import {Formik, Form, useField} from 'formik';
import * as Yup from 'yup';
import SubmitCancelButtons from "../SubmitCancelButtons";
import {useNavigate} from "react-router";
import * as events from "events";


const TextInput = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   const paragraphErrorClass = 'block w-6/12 bg-red-100 border border-red-400 text-red-700 px-6 py-2 rounded relative'
   return (
     <>
         <div className="sm:col-span-3">
           <label className='block text-sm font-medium leading-6 text-gray-900'
                  htmlFor={props.name}>{label}</label>
           <input id={props.name} className="block w-6/12 p-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...field} {...props} />
           {meta.touched && meta.error ? (<p className={paragraphErrorClass}>{meta.error}</p>) : null}
             </div>
     </>
   );
 };

const TextArea = ({label, ...props}) => {
    const [field, meta] = useField(props);
    const paragraphErrorClass = 'block w-6/12 bg-red-100 border border-red-400 text-red-700 px-6 py-2 rounded relative'
    return (
        <>
            <div className="sm:col-span-3">
                <label htmlFor={props.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                </label>
                <textarea
                    id={props.name}
                    rows="4"
                    className='block  p-2.5 w-6/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    {...field} {...props}
                >
                </textarea>
                {meta.touched && meta.error ? (<p className={paragraphErrorClass}>{meta.error}</p>) : null}
            </div>
        </>
    )
}


const CreateEditActorForm = (props) => {
    const navigate = useNavigate()
    function onCancelHandler() {
        navigate(props.backPath)
    }
    function handleSubmit(values) {
        props.onSubmit({values})
    }


    return (
        <>
            <Formik
                initialValues={{name: '', age: 0, description: ''}}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    age: Yup.number()
                        .min(18, 'Must be more than 18')
                        .required('Required')
                        .max(99, 'Must be 99 or less'),
                    description: Yup.string()
                        .min(5, 'Must be more 5 characters or more')
                        .required('Required'),
                })}
                onSubmit={handleSubmit}
            >
                <Form>
                    <TextInput label="Name" name="name" type="text" placeholder="Jane"/>
                    <TextInput label="Age" name="age" type="number"/>
                    <TextArea label="Description" name="description" type="text"/>
                    <SubmitCancelButtons onCancelHandler={onCancelHandler}/>
                </Form>
            </Formik>

        </>
    )
};
export default CreateEditActorForm;
