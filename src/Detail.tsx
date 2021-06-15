import "antd/dist/antd.css";
import  {useState,useEffect } from "react";
import "./index.css";
import { Form, Input, Button, DatePicker, Select, Space,Popconfirm } from "antd";
import moment from "moment";
// import Modal from "antd/lib/modal/Modal";

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 6,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 6,
    },
  };
  
  function Detail() {
    const cancel=()=>{
        window.location.href = "/edit/" + id
      }
  
  type State = {
    isLoading?: boolean
    student?: any
  }
  
  const getEditId = (path: string) => {
    const id = window.location.pathname.replace(path, '')
    if (id.includes('/detail')) 
    return id.replace('/detail', '').replace('/', '')
    return id.replace('/', '')
  }
    const { Option } = Select;
    const [form] = Form.useForm();
    const [state, setState] = useState<State>({isLoading: true, student: {}});
  
    const id = getEditId(window.location.href)
      useEffect(() => {
        fetch(`http://localhost:12345/api/student/${id}`,{
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then((res) => res.json())
        .then((detail) => {
            setState({
                isLoading: false,
                student: {...detail.data,
                birthday: moment(detail.data['birthday'])}})})
      })

      const EditStudent = async () => {
        const {name, birthday, email, rank} = form.getFieldsValue()
        const student = {name: name, birthday: birthday.format('YYYY-MM-DD'), email:email, rank:rank}
              fetch(`http://localhost:12345/api/student/${id}`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(student),
                })
                  .then((response) => response.json())
                  .then((students) => {
                    setState(students.data);
                    alert("Edit sussces")
                    window.location.href = "/" 
                    console.log(students.data)
                  })
        };

        const Delete = async () => {
            fetch(`http://localhost:12345/api/student/${id}` , {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }).then((response) => {
              window.location.href = "/"; 
            });
            
          };
  return (
    <div className="containerDetail">
       <h1 className="titleDetail">Detail's student</h1>
    {
      state.isLoading ? <></> : 
      
      <Form form={form} initialValues={state.student} >
      <Form.Item
        {...layout} name="name" label="Name" rules={[ { required: true} ]}>
      <Input></Input>
      </Form.Item>
      <Form.Item label="BirthDay" name = 'birthday' {...layout} rules={[ { required: true} ]}>
        <DatePicker placeholder='' format='YYYY-MM-DD'></DatePicker>
      </Form.Item>
      <Form.Item {...layout} label="Email" name="email" rules={[ { required: true} ]}>
        <Input/>
      </Form.Item>
      <Form.Item name='rank' label="Rank" {...layout} rules={[ { required: true} ]}>
        <Select  >
          <Option value="good">Good</Option>
          <Option value="quite">Quite</Option>
          <Option value="bad">Bad</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
          <Space>
          <Button type="primary"  onClick={EditStudent}>
                <a>Edit</a>
            </Button>
            <Button type="primary" danger>
            <Popconfirm title="Sure to delete?" onConfirm={() => Delete()}>
                <a>Delete</a>
                </Popconfirm>
            </Button>
            <Button type="primary" >
            <Popconfirm title="Sure to cancel?" onConfirm={() => cancel()}>
                <a>Cancel</a>
                </Popconfirm>
     </Button>
        </Space>
      </Form.Item>
    </Form>
    }
    </div>
  );
};

export default Detail;
