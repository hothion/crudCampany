import "antd/dist/antd.css";
import  {useState } from "react";
import "./index.css";
import { Form, Input, Button, DatePicker, Select,InputNumber, Space, Row } from "antd";

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
  const { Option } = Select;
  const [form] = Form.useForm();
  const [student, setStudent] = useState([]);
    const editStudent = async (key:any) => {
            fetch("http://localhost:12345/api/student/" + key, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(student),
              })
                .then((response) => response.json())
                .then((students) => {
                  setStudent(students.data);
                  console.log(students.data)
                //   window.location.href = "/"; 
                });
      };
     const onNameChange = async (e: any) => {
        const { name, value, type, id } = e.currentTarget
        // @ts-ignore
            setStudent({
                ...student,
                [name]: value
            })
    }
  return (
    <div style={{ margin: 100 }}>
    <Form form={form} onFinish={editStudent}>
      <Form.Item
        {...layout} name="name" label="Name">
      <Input></Input>
      </Form.Item>
      <Form.Item label="BirthDay" name='birthday' {...layout}>
        <DatePicker/>
      </Form.Item>
      <Form.Item {...layout} label="Email" name="email">
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
          <Space>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
        <Button type="primary" danger>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
    </div>
  );
};

export default EditStudent;
