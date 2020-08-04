import React,{useState} from 'react';
import { Form, Input, Button, Select, InputNumber} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import './AddPatient.less'

const AddPatient = (props) => {

  const initialFormState = { key : null, name: "",age : "" , gender:"" };
  
  const [form] = Form.useForm()
  const [user, setUser ] = useState(initialFormState);
  
  
  const onFinish = values => {
    props.addUser(values);
    // setUser(initialFormState);
    form.resetFields();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="card">
      <Form 
      className="card__body"
      layout="inline"
      form = {form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      >
        <legend>Add Patient</legend>
        <Form.Item label="Name" name="name" rules={[{required: true}]}>
          <Input name="name" value={user.name} placeholder="Patient name.." />
        </Form.Item>
        <Form.Item label="Age" name="age" rules={[{required: true}]}>
          <InputNumber name="age" value={user.age} min={1} placeholder="Age"/>
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{required: true}]}>
          <Select placeholder="Select an option" value={user.gender}>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item> 
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Patient <PlusOutlined /></Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPatient;