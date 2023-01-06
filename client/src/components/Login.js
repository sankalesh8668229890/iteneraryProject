import React, { useState } from'react'
import { Form, Button, Input } from "antd"
import "../App.css"
import "./Login.css"

const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleInputs = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };
    console.log("user",user)

    const postData = async(e)=>{
        e.preventDefault()
        const {email, password} = user

        const res = await fetch("http://localhost:3000/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await res.json();
        if(data.status === 200){
            alert("Login successful")
        }
        else{
            alert(data.message)
        }
    }
    return (
        <div className="Login">
            <h1>Login Page</h1>
            <Form autoComplete="off" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>

                <Form.Item name="email" label="email"
                rules={[
                    {
                        required: true,
                        message: "Please enter email address"
                    },
                    {
                        type: 'email',
                        message: "Please enter a valid email address"
                    }
                ]}
                hasFeedback>
                    <Input placeholder='Please enter Email' name="email" onChange={handleInputs} />
                </Form.Item>
                <Form.Item name="password" label="password"
                    rules={[
                        {
                            required: true,
                            message: "Please enter password"
                        },
                        {
                            min: 8,
                            message: "Password must be at least 8 characters",
                        },
                    ]}
                    hasFeedback>
                        <Input.Password placeholder='Please Enter Password' name="password" onChange={handleInputs} />
                    </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" onClick={postData}>Login</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login