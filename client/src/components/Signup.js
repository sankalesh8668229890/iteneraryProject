import React, { useState } from 'react'
import { Form, Button, Checkbox, Input  } from "antd"
// import "../App.css"
import "./Temp.css"

function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    })

    const handleInputs = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };
    console.log("user", user)
    const postData = async (e) => {
        e.preventDefault()
        const { name, email, phone, password } = user

        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                password
            })
        });
        const data = await res.json();
        console.log(data)
        if (data.status === 200) {
            alert("Registration Successful")
        }
        else {
            alert(data.message)
        }
    }
    return (
        <div className="Temp">
            <h1>Signup Page</h1>
            <Form autoComplete="off" labelCol={{ span: 10 }} wrapperCol={{ span:25 }}>
                <Form.Item className="Temp-name" name="fullName"
                    label="Full Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your full name"
                        },
                        {
                            whitespace: true
                        },
                        {
                            pattern: /^[a-zA-Z\s]+$/,
                            message: "Please enter only letters"
                        }
                    ]}
                    hasFeedback

                >
                    <Input placeholder='Type Your Name' name='name' onChange={handleInputs}/>
                </Form.Item>

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
                    <Input placeholder='Please enter Email' name='email' onChange={handleInputs} />
                </Form.Item>

                <Form.Item name="phone-no" label="phone no"
                    rules={[
                        { required: true, message: "Please enter phone number" },
                        {
                            type: 'phone',
                            message: "Please enter a valid phone number"
                        }
                    ]}
                hasFeedback>
                    <Input placeholder='Please Enter Your Phone Number' name='phone' onChange={handleInputs} />
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
                    <Input.Password placeholder='Please Enter Password' name='password' onChange={handleInputs}/>
                </Form.Item>



                <Form.Item name="agreement" wrapperCol={{ span: 24 }}>
                    <Checkbox> Agree to our <a href="#">Terms And Condition</a></Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" onClick={postData}>Registration</Button>
                </Form.Item>

            </Form>
        </div>
    );
}
export default Signup;
