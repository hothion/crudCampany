import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import { Form,message, Button, Space,Popconfirm } from "antd";
export default function Student_Detail() {
  type Student = {
    isLoading?: boolean;
    students?: any;
  };
  const getDetailId = (path: string) => {
    const id = window.location.pathname.replace(path, '');
    if (id.includes('/detailstudent'))
    return id.replace('/detailstudent', '').replace('/', '')
    return id.replace('/', '');
  };
 
  const [studentDetail, setStudent] = useState<Student>({
    isLoading: true,
    students: {},
  });

  const id = getDetailId(window.location.href);

  useEffect(() => {
    fetch(`http://localhost:12345/api/student/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((detail) => {
        setStudent({
          isLoading: false,
          students: {
            ...detail.data,
          },
        });
      });
  });

  const editstudent=()=>{
    window.location.href = "/edit/" +id 
  }
  const cancel=()=>{
    window.location.href = "/" 
  }
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
    <div style={{ margin: 100 }}>
       <h1 style={{marginLeft: "425px", fontSize: "2.8em"}}>Detail's student</h1>
    {
      studentDetail.isLoading ? <></> : 
      
      <Form style={{marginLeft: "425px"}} >
         <div>
          <h3>
          <b style={{marginRight: "10px"}}>Fullname:</b> {studentDetail.students.name}
          </h3>
          <h3>
          <b style={{marginRight: "10px"}}> Birthday:</b> {studentDetail.students.birthday}
          </h3>
          <h3>
          <b style={{marginRight: "10px"}}> Email: </b>{studentDetail.students.email}
          </h3>
          <h3>
          <b style={{marginRight: "10px"}}>Rank:</b>{studentDetail.students.rank}
          </h3>
        </div>
      <Form.Item>
        <Space>
      <Button type="primary" onClick={editstudent}>
      <Popconfirm title="Sure to edit?" onConfirm={() => editstudent()}>
          <a>Edit</a>
        </Popconfirm>
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
}