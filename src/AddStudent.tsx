import "antd/dist/antd.css";
import  {useState } from "react";
import "./index.css";
import { Form, Input, Button, DatePicker, Select } from "antd";

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

  const AddStudent = { name: "", birthday: new Date(), email: "", rank: false};
  const { Option } = Select;
  const [form] = Form.useForm()
  const [student, setStudent] = useState(AddStudent);
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
        setStudent(students.data);
        console.log(students.data)
        window.location.href = "/"; 
      });
  }

  return (
    <div style={{ margin: 100 }}>
    <Form form={form} onFinish={addStudent}>
      <Form.Item
        {...layout} name="name" label="Name" rules={[ { required: true, message: "Please input your username!", }, ]} >
      <Input></Input>
      </Form.Item>
      <Form.Item label="BirthDay" name='birthday' {...layout}>
        <DatePicker/>
      </Form.Item>
      <Form.Item {...layout} label="Email" name="email" rules={[ { type: "email",message: "Please input correct email format!" }, ]} >
        <Input/>
      </Form.Item>
      <Form.Item name='rank' label="Rank" {...layout}>
        <Select  >
          <Option value="good">Good</Option>
          <Option value="quite">Quite</Option>
          <Option value="bad">Bad</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Student_Add;
