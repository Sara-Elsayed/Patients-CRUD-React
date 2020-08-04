import React, { useState , useEffect} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Select, Space } from 'antd';
import {EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './PatientsTable.less';

const Option = Select.Option;
const genderArr = ["Male", "Female"]
const EditableCell = ({editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {

//Input type
let inputNode;
if (inputType === 'number') {
  inputNode = <InputNumber/>
} else if (inputType === 'text') {
  inputNode = <Input/>
}else{
  inputNode = <Select style={{ width : 300 }}> 
      {genderArr.map( gen => (
       <Option key={gen}> {gen} </Option>
      ))}
     </Select>
}

return (
    <td {...restProps}>
      { editing ? (
        <Form.Item name={dataIndex} style={{margin: 0}} 
        rules={[{ required: true, message: `Please Input ${title}!`}]}>
          {inputNode}
        </Form.Item>) 
      : (children)
      }
    </td>
  );
};

const PatientsTable = (props) => {
  //States sittings
  const [form] = Form.useForm();
  const [data, setData] = useState('');
  const [editingKey, setEditingKey] = useState('');
  
  const isEditing = record => record.key === editingKey;

  useEffect(()=>{
    if(data.length !== props.users.length){
      const propsLength = props.users.length
      setData([...data,props.users[propsLength-1]])
    }
  },[props.users])

  useEffect(()=>{
      setData(props.users)
  },[])

  const edit = record => {
    form.setFieldsValue({
      name: '',
      age: '',
      gender: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const deleteRecord = record => {
    let newData = data.filter((value)=>{
       return value.key !==record.key;
      });
      setData(newData);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: '25%',
      editable: true,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: '25%',
      editable: true,
    },
    {
      title: 'Actions',
      dataIndex: 'Actions',
      width:'25%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a href="javascript:;"
              onClick={() => save(record.key)}
             >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Space size="middle">
            <a disabled={editingKey !== ''} onClick={() => edit(record)} className="color-sucess">
            Edit <EditOutlined />
          </a>  
          <span>
          <Popconfirm title="Sure to Delete?" onConfirm={() => deleteRecord(record)}>
            <a className="color-danger">Delete <DeleteOutlined /></a>
          </Popconfirm>
          </span>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' 
                  :col.dataIndex === 'name' ? 'text'
                  :<Select >
                    {genderArr.map( gen => (
                    <Option key={gen}> {gen} </Option>
                    ))}
                  </Select>,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} className="table">
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};


export default PatientsTable;