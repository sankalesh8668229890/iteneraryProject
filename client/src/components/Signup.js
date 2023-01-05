import React, { useState } from 'react'
import { Form, Button, Checkbox, DatePicker, Input, Select } from "antd"
import "../App.css"

function Signup() {

    let SignUp = () => {

        const [user, setUser] = useState({
            name: "",
            email: "",
            phone: "",
            password: ""
        })
    };

    const handleInputs = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    };

    const PostData = async (e) => {
        e.preventDefault()
        const { name, email, phone, password } = user

        const res = await fetch("/register", {
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




        return (
            <div className="App">
                <Form autoComplete="off" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
                    <Form.Item name="fullName"
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
                        <Input placeholder='Type Your Name' />
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
                        <Input placeholder='Please enter Email' />
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
                        <Input placeholder='Please Enter Your Phone Number' />
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
                        <Input.Password placeholder='Please Enter Password' />
                    </Form.Item>



                    <Form.Item name="agreement" wrapperCol={{ span: 24 }}>
                        <Checkbox> Agree to our <a href="#">Terms And Condition</a></Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 24 }}>
                        <Button type="primary" htmlType="submit" onClick={PostData}>Registration</Button>
                    </Form.Item>

                </Form>
            </div>
        );
    }
}
export default Signup;
