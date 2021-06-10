import "antd/dist/antd.css";
import  {useState,useEffect } from "react";
import "./index.css";
// // @ts-ignore
// import { useRouter } from 'next/router'
import { Form, message, Input, Button, DatePicker, Select, Space } from "antd";
import moment from "moment";
import Modal from "antd/lib/modal/Modal";

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

function EditStudent() {
const cancel=()=>{
  window.location.href = "/"; 
}

type State = {
  isLoading?: boolean
  student?: any
}

const getEditId = (path: string) => {
  const id = window.location.pathname.replace(path, '')
  if (id.includes('/edit')) 
  return id.replace('/edit', '').replace('/', '')
  return id.replace('/', '')
}

const [visible, setIsModalVisible] = useState(false);

const handleOk = () => {
  setIsModalVisible(false);
  window.location.href = "/detailstudent/" + id
  message.success("Edit a student successfully!");
};

const onCancel = () => {
  setIsModalVisible(false);
};

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
    }).then((res) => res.json()).then((detail) => {setState({isLoading: false, student: {...detail.data, birthday: moment(detail.data['birthday'])}})})
  })

    const editStudent = async () => {
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
                  setIsModalVisible(true);
                  setState(students.data);
                    
                  console.log(students.data)
                })
      };
  return (
    <div style={{ margin: 100 }}>
       <h1 style={{marginLeft: "425px", fontSize: "2.8em"}}>Edit student</h1>
    {
      state.isLoading ? <></> : 
      
      <Form form={form} onFinish={editStudent} initialValues={state.student} >
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
        <Button type="primary" htmlType="submit">
          Update
        </Button>
        <Modal  title="Edit a student"
        visible={visible}
        onCancel={onCancel}
        onOk={handleOk}>
        <p>You are sure to update</p>
        </Modal>
        <Button type="primary" danger onClick={cancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
    }
    </div>
  );
};

export default EditStudent;
