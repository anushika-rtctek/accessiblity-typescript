import { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Button, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';

interface InitialInput {
    fname: string;
    mname: string;
    lname: string;
    gender: string;
    dob: string;
    phno: string;
    email: string;
    house: string;
    city: string;
    states: string;
}

interface InitialError {
    fname: string;
    lname: string;
    gender: string;
    dob: string;
    phno: string;
    email: string;
    house: string;
    city: string;
    states: string;
}

export const UserForm = () => {

    const initialInput: InitialInput = {
        fname: '',
        mname: '',
        lname: '',
        gender: '',
        dob: '',
        phno: '',
        email: '',
        house: '',
        city: '',
        states: 'NA'
    }

    const initialError: InitialError = {
        fname: '',
        lname: '',
        gender: '',
        dob: '',
        phno: '',
        email: '',
        house: '',
        city: '',
        states: ''
    }

    const [inputs, setInputs] = useState<InitialInput>(initialInput)
    const [open, setOpen] = useState<boolean>(false)
    const [errors, setErrors] = useState<InitialError>(initialError)

    const validateInput = (name: any) => {
        const value = inputs[name as keyof InitialInput];
        let newErrors = ''
        const currentDate = new Date();
        switch (name) {
            case 'fname':
                if (!value) {
                    newErrors = 'First name is required.'
                }
                break
            case 'lname':
                if (!value) {
                    newErrors = 'Last name is required.'
                }
                break;
            case 'gender':
                if (!value) {
                    newErrors = 'Gender is required.'
                }
                break
            case 'dob':
                {
                    const date = new Date(value);
                    if (!value) {
                        newErrors = 'Date of Birth is required.'
                    } else if (date > currentDate) {
                        newErrors = 'Date of Birth cannot be in the future.'
                    }
                }
                break
            case 'phno':
                if (!value) {
                    newErrors = 'Phone number is required.'
                } else if (!/^\d{10}$/.test(value)) {
                    newErrors = 'Phone number must be 10 digits only.'
                }
                break
            case 'email':
                if (!value) {
                    newErrors = 'Email is required.'
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors = 'Email address is invalid.'
                }
                break
            case 'house':
                if (!value) {
                    newErrors = 'House/Flat No.and Name is required.'
                }
                break
            case 'city':
                if (!value) {
                    newErrors = 'City is required.'
                }
                break
            case 'states':
                if (value == 'NA') {
                    newErrors = 'State is required.'
                }
                break
            default:
                break;
        }
        return newErrors
    }

    const changeHandler = (event: any) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }))
    };

    const handleClose = (reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const submitHandler = (event: any) => {
        event.preventDefault()
        const newErrors: InitialError = {...initialError}
        for (const key in inputs) {
            const error = validateInput(key);
            if (error) newErrors[key as keyof InitialError] = error
        }

        function compareObjects(obj1: InitialError, obj2: InitialError): boolean {

            const keys1 = Object.keys(obj1) as (keyof InitialError)[];
            const keys2 = Object.keys(obj2) as (keyof InitialError)[];

            if (!keys2.every(key => keys1.includes(key))) {
                return false;
            }

            for (const key of keys1) {
                if (obj1[key] !== obj2[key]) {
                    return false;
                }
            }

            return true;
        }
        console.log(compareObjects(initialError, newErrors))
        if (compareObjects(initialError, newErrors)) {
            setErrors(initialError)
            setOpen(true)
        } else {
            setErrors(newErrors)
        }
    }

    const resetHandler = (event: any) => {
        event.preventDefault();
        setInputs(initialInput);
        setErrors(() => initialError)
    }

    return (
        <div>
            <div>
                <h2>User Form</h2>
                <Snackbar open={open} autoHideDuration={700} onClose={handleClose} message="Form submitted successfully" />
            </div>
            <form method='post' onSubmit={submitHandler}>
                <fieldset>
                    <legend>Personal Info</legend>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginLeft: 30 }}>
                            <InputLabel htmlFor='fname'>First Name</InputLabel>
                            <TextField name='fname' id='fname' onChange={changeHandler} value={inputs.fname || ''} type='text' />
                            {errors.fname && <p style={{ color: 'red' }}>{errors.fname}</p>}
                        </div>
                        <div style={{ marginLeft: 30 }}>
                            <InputLabel htmlFor='mname'>Middle Name</InputLabel>
                            <TextField name='mname' id='mname' onChange={changeHandler} value={inputs.mname || ''} type='text' />
                        </div>
                        <div style={{ marginLeft: 30 }}>
                            <InputLabel htmlFor='lname'>Last Name</InputLabel>
                            <TextField name='lname' id='lname' onChange={changeHandler} value={inputs.lname || ''} type='text' />
                            {errors.lname && <p style={{ color: 'red' }}>{errors.lname}</p>}
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Gender</legend>
                    <RadioGroup name='gender' id='gender' value={inputs.gender} onChange={changeHandler} >
                        <div style={{ display: 'flex', marginLeft: 30 }}>
                            <FormControlLabel value='male' control={<Radio />} label='Male' />
                            <FormControlLabel value='female' control={<Radio />} label='Female' />
                            <FormControlLabel value='others' control={<Radio />} label='Others' />
                            <FormControlLabel value='na' control={<Radio />} label='Prefer not to specify' />
                        </div>
                    </RadioGroup>
                    {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
                </fieldset>
                <fieldset>
                    <legend>Contact Info</legend>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginLeft: 30 }}>
                            <InputLabel htmlFor='dob'>Date of Birth</InputLabel>
                            <TextField name='dob' id='dob' onChange={changeHandler} value={inputs.dob || ''} type='date' />
                            {errors.dob && <p style={{ color: 'red' }}>{errors.dob}</p>}
                        </div>
                        <div style={{ marginLeft: 30 }}>
                            <InputLabel htmlFor='phno'>Phone No.</InputLabel>
                            <TextField name='phno' id='phno' onChange={changeHandler} value={inputs.phno || ''} type='number' />
                            {errors.phno && <p style={{ color: 'red' }}>{errors.phno}</p>}
                        </div>
                        <div style={{ marginLeft: 30 }}>
                            <InputLabel htmlFor='email'>Email address</InputLabel>
                            <TextField name='email' id='email' onChange={changeHandler} value={inputs.email || ''} type='email' />
                            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Residential Address</legend>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginLeft: 30 }}>
                            <InputLabel htmlFor='house'>House/Flat No.and Name </InputLabel>
                            <TextField name='house' id='house' onChange={changeHandler} value={inputs.house || ''} type='text' />
                            {errors.house && <p style={{ color: 'red' }}>{errors.house}</p>}
                        </div>
                        <div style={{ marginLeft: 30 }}>
                            <InputLabel htmlFor='city'>City</InputLabel>
                            <TextField name='city' id='city' onChange={changeHandler} value={inputs.city || ''} type='text' />
                            {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
                        </div>
                        <div style={{ marginLeft: 30 }}>
                            <InputLabel id='state'>State</InputLabel>
                            <Select name='states' id='states' autoWidth={true} labelId='state' label="State" onChange={changeHandler} value={inputs.states || 'NA'} >
                                <MenuItem value='NA'>Select a State</MenuItem>
                                <MenuItem value='DL'>Delhi</MenuItem>
                                <MenuItem value='UP'>Uttar Pradesh</MenuItem>
                                <MenuItem value='BH'>Bihar</MenuItem>
                                <MenuItem value='HR'>Haryana</MenuItem>
                            </Select>
                            {errors.states && <p style={{ color: 'red' }}>{errors.states}</p>}
                        </div>
                    </div>
                </fieldset>
                <div style={{ display: 'flex' }}>
                    <div style={{ marginLeft: 30, marginTop: 30 }}>
                        <Button type='submit' variant='contained' onClick={submitHandler}>Submit</Button>
                    </div>
                    <div style={{ marginLeft: 30, marginTop: 30 }}>
                        <Button type='reset' variant='contained' onClick={resetHandler}>Reset</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}