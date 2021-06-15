import "antd/dist/antd.css";
import { useEffect, useState } from "react";
// @ts-ignore
import { Link } from "react-router-dom";
import {Form,Table,Popconfirm,Button,Divider, Space,Input} from "antd";
import {tableColumnTextFilterConfig} from './Search'
export default function StudentList() {

  type State = {
    name?: string,
    key?: string,
  }
  
  const [form] = Form.useForm();
  const [student, setStudent] = useState([]);

    
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      ...tableColumnTextFilterConfig<State>(),
      onFilter: (value:any, record:any) => {
        return record.name
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "Rank",
      dataIndex: "rank",
      editable: true,
      filters: [
        { text: 'Excellent', value: 'Excellent' },
        { text: 'Good', value: 'Good' },
        { text: 'Quite', value: 'Quite' },
        { text: 'Medium', value: 'medium' },
        { text: 'Bad', value: 'bad' }
      ],
      onFilter:(value:any,record:any)=>record.rank.indexOf(value)===0
    },
    {
      title: "Action",
      dataIndex: "delete",
      key: "delete",
      render: (text: string, record: any) => (
        <span>
          <Space>
          <Link to={`/detail/`+(record.id)}>
          {"View"}
        </Link>
           <Link to={`/edit/`+(record.id)}>
          {"Edit"}
        </Link>
        <Popconfirm title="Sure to delete?" onConfirm={() => Delete(record.id)}>
          <a>Delete</a>
        </Popconfirm>
        </Space>
        </span>
        
      ),
    },

  ];

  const handleTableChange = (pagination:any,filters:any) => {};

  const Delete = async (key: any) => {
    fetch("http://localhost:12345/api/student/" + key, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      window.location.reload();
    });
  };


  useEffect(() => {
    fetch("http://localhost:12345/api/student")
      .then((res) => res.json())
      .then((response) => {
        setStudent(response.data);
      });
  }, []);



  return (
    <div className="containerList">
      <Button type="primary">
        <Link to="/add">Add a student</Link>
      </Button>
      <Divider />
      <Form form={form} component={false}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={student}
          pagination={{pageSize:3}}
          onChange={handleTableChange}
        />
      </Form>
    </div>
  );
}
