import "antd/dist/antd.css";
import { useEffect, useState } from "react";
// @ts-ignore
import { Link } from "react-router-dom";
import {Form,Table,Popconfirm,Button,Divider} from "antd";

export default function StudentList() {
  const [form] = Form.useForm();
  const [student, setStudent] = useState([]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
      render: (text:string, record:any) => (
        <Link to={`/detailstudent/` + record.id} style={{ color: "black" }}>
          {text}
        </Link>
      ),
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
    },
    {
      title: "Action",
      dataIndex: "delete",
      key: "delete",
      render: (text: string, record: any) => (
        <Button type="primary" danger>
        <Popconfirm title="Sure to delete?" onConfirm={() => Delete(record.id)}>
          <a>Delete</a>
        </Popconfirm>
        </Button>
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key:"operation",
      render: (text:string, record:any) => (
        <Button type="primary" >
        <Link to={`/edit/`+(record.id)}
      >
          {"Edit"}
        </Link>
        </Button>
        
      ),

    },
  ];
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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex === "name" ? "text" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <div style={{ margin: 100 }}>
      <Button type="primary">
        <Link to="/add">Add student list</Link>
      </Button>
      <Divider />
      <Form form={form} component={false}>
        <Table
          rowKey="id"
          columns={mergedColumns}
          dataSource={student}
        />
      </Form>
    </div>
  );
}
