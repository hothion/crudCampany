import "antd/dist/antd.css";
import  {useState } from "react";
import "./index.css";
import { Form, message,Modal,Input, Button, DatePicker, Select, Space } from "antd";

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



export interface Istudent  {
  name: string,
  birthday: Date,
  email:string,
  rank:false
}

// const Student_Add = () => {
  const Student_Add: React.FC<Istudent> = () => {
  const AddStudent = { id:'',name: "", birthday: new Date(), email: "", rank: false};
  const { Option } = Select;
  const [form] = Form.useForm()
  const [student, setStudent] = useState(AddStudent);

const [visible, setIsModalVisible] = useState(false);

const handleOk = () => {
  setIsModalVisible(false);
  window.location.href = "/detailstudent/"+ student.id
  message.success("Add a student successfully!");
};

const onCancel = () => {
  setIsModalVisible(false);
};

  const addStudent = () => {
    const {name, birthday, email, rank} = form.getFieldsValue()
    const student = {name: name, birthday: birthday.format('YYYY-MM-DD'), email:email,rank:rank}
    fetch("http://localhost:12345/api/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => response.json())
      .then((students) => {
        setIsModalVisible(true);
        setStudent(students.data);
        console.log(students.data)
      });
  }
 const back = () => {
  window.location.href = "/"; 
  }
  return (
    <div style={{ margin: 100 }}>
       <h1 style={{marginLeft: "425px", fontSize: "2.8em"}}>Add student to list</h1>
    <Form form={form} onFinish={addStudent}>
      <Form.Item
        {...layout} name="name" label="Name" rules={[ { required: true, message: "Please input your username!" }]} >
      <Input></Input>
      </Form.Item>
      <Form.Item label="BirthDay" name='birthday' {...layout} rules={[ { required: true} ]}>
        <DatePicker/>
      </Form.Item>
      <Form.Item {...layout} label="Email" name="email" rules={[ { required: true,type: "email",message: "Please input correct email format!" }]} >
        <Input/>
      </Form.Item>
      <Form.Item name='rank' label="Rank" {...layout} rules={[ { required: true}]}>
        <Select  >
          <Option value="Good">Good</Option>
          <Option value="Quite">Quite</Option>
          <Option value="Bad">Bad</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
        <Modal  title="Add a student"
        visible={visible}
        onCancel={onCancel}
        onOk={handleOk}>
        <p>You sure to save</p>
        </Modal>
        <Button type="primary" danger onClick={back}>
          Back home
        </Button>
        </Space>
      </Form.Item>
    
    </Form>
    </div>
  );
};

export default Student_Add;
