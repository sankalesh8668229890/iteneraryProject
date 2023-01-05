import React from'react'
import { Form, Button, Input } from "antd"
import "../App.css"

const Login = () => {
    return (
        <div className="App">
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
                    <Input placeholder='Please enter Email' />
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
                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login