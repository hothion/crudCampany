import { Table,Button,Divider} from "antd";
import 'antd/dist/antd.css';
import { useEffect, useState} from 'react';
// @ts-ignore
import { Link } from "react-router-dom";
const columns = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
  },
  {
    key: "birthday",
    title: "Birthday",
    dataIndex: "birthday",
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
  },
  {
    key: "rank",
    title: "Rank",
    dataIndex: "rank",
  },
  
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    // render: (_, record) =>
    // this.state.dataSource.length >= 1 ? (
    //   <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
    //     <a>Delete</a>
    //   </Popconfirm>
    // ) : null,
    
  },
  {
    title: 'Operation',
    key:'operation',
    dataIndex: '',
    render: () => <a>Edit</a>
    
  },
];
export default function StudentList() {
  
  const [student, setStudent] = useState([])
  const getData = async () => {
    fetch('http://localhost:12345/api/student')
        .then((res) => res.json())
        .then((student) => {
          setStudent(student.data)
        console.log(student.data)
        })
}
useEffect(() => {
    getData()
}, [])
  return (
    <div>
        <Divider/>
      <Button ><Link to="/add">Add student</Link></Button>
      <Divider/>
      <Table 
      columns={columns} 
      dataSource={student} />
    </div>
  );
}