import { useFormState } from 'react-dom'
import React, { useState, useRef, useEffect } from "react";
import { State, updateInfo } from './actions'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

interface FormProps {
    children: React.ReactNode
    dispatch: (formData: FormData) => void
    title: string,
    submitText: string,
}


const Form: React.FC<FormProps> = ({
    children,
    dispatch,
   
    title,
    submitText,
}) => {
    return (
        <form
            className="animate-in h-full flex-1 flex flex-col w-[90vw] sm:max-w-md gap-4 text-foreground border rounded-md shadow-md p-4 bg-background"
            action={dispatch}
        >
            <h2 className="text-2xl pb-1 border-b-2 border-foreground/10">{title}</h2>


            {/* <span className=''></span> */}


            <div className='flex flex-col flex-1 justify-center gap-4'>
                {children}
            </div>


            <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
                {submitText}
            </button>
           
        </form>
    )
}






export const UpdateProfileForm = () => {

    const initialState: State = { message: null, errors: {} }
   
    const [displayState, updateDispatch] = useFormState(updateInfo, initialState)

    //TO-DO: make it so the form starts with all the infomation already filled

    //const supabase = createClient()
    //const [user, setUser ] = useState<User|null>(null)
  
    //supabase.auth.getUser().then(({data, error }) => {
    //  setUser(data.user)
    //})

    //console.log(user)
    //console.log("this is the form user")

    //if (user != null){

        return (
            <Form
                dispatch={updateDispatch}
                title='Account Info'
                submitText='Save Changes'      >
    
    
                <EmailField errors={displayState.errors?.new_email} />
            </Form>
        )
        
    //}
    
}




interface Field {
    name: string
    label: string
    type?: 'email' | 'text'


    required?: boolean
    errors?: string[]
}

const Field = ({
    name,
    label,
    type = 'text',

    required = false,
    errors,
}: Field) => {
    return (
        
        <div className='flex flex-col gap-1'>
            <label className="text-md" htmlFor={name}>
                {label}
            </label>
            
            <input
                className="rounded-md px-4 py-2 bg-inherit border"
                type={type}
                name={name}

                required={required}
            />
            <p className="text-red-500 h-6">{errors}</p>
        </div>
    )
}


interface EmailFieldProps {
    errors?: string[]

}
const EmailField: React.FC<EmailFieldProps> = ({ errors}) => <Field
    name= "email"
    label= "Email"
    type= "email"


    required
    errors={errors}
/>

