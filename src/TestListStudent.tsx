import "antd/dist/antd.css";
import { useEffect, useState } from "react"
// @ts-ignore
import { Link } from "react-router-dom";
import {Form,Table,Popconfirm,Typography,Input,Button,InputNumber,Divider} from "antd";
export default function StudentList() {
  const [form] = Form.useForm();
  const [student, setStudent] = useState([]);
  const [editingKey, setEditingKey] = useState("");

 interface Item {
    key: string;
    name: string;
    bỉthday: Date;
    email: string;
    rank:false
  }
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
  }
  
const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "text" ? <Input /> : <InputNumber />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const isEditing = (record:any) => record.id === editingKey;

  const Edit = (record:any) => {
    form.setFieldsValue({
      name: "",
      birthday: "",
      email: "",
      rank: "",
      ...record,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
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
      render: (record:any) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => Delete(record.id)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (record:any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              style={{
                marginRight: 6,
              }}
              onClick={() => Save(record.id)}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => Edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const Delete = async (key:any) => {
    fetch("http://localhost:12345/api/student/" + key, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      window.location.reload();
    });
  };

  const Save = async (key:any) => {
    try {
      const row = await form.validateFields();

      const newData = [...student] as any;
      fetch("http://localhost:12345/api/student/" + key, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(row),
      })
        .then((res) => res.json())
        .then((response) => {
          const index = newData.findIndex(
            (student:any) => student["id"] === response.data["id"]
          );
          newData[index] = response.data;
          setStudent(newData);
          setEditingKey("");
        });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
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
      onCell: (record:any) => ({
        record,
        inputType: col.dataIndex === "name" ? "text" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
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
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          dataSource={student}
        />
      </Form>
    </div>
  );
}
// import { Table, Button, Divider, Popconfirm,Form,Typography,InputNumber,Input} from "antd";
// import "antd/dist/antd.css";
// import Item from "antd/lib/list/Item";
// import { useEffect, useState } from "react";
// @ts-ignore
// import { Link } from "react-router-dom";

// interface Item {
//     key: string;
//     name: string;
//     bỉthday: Date;
//     email: string;
//     rank:false
//   }
// interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
//     editing: boolean;
//     dataIndex: string;
//     title: any;
//     inputType: 'number' | 'text';
//     record: Item;
//     index: number;
//     children: React.ReactNode;
//   }
  
// const EditableCell: React.FC<EditableCellProps> = ({
//     editing,
//     dataIndex,
//     title,
//     inputType,
//     record,
//     index,
//     children,
//     ...restProps
//   }) => {
//     const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
//     return (
//       <td {...restProps}>
//         {editing ? (
//           <Form.Item
//             name={dataIndex}
//             style={{
//               margin: 0,
//             }}
//             rules={[
//               {
//                 required: true,
//                 message: `Please Input ${title}!`,
//               },
//             ]}
//           >
//             {inputNode}
//           </Form.Item>
//         ) : (
//           children
//         )}
//       </td>
//     );
//   };
//     const StudentList = () => {
//     const columns = [
//     {
//       key: "name",
//       title: "Name",
//       dataIndex: "name",
//       editable: true,
//     },
//     {
//       key: "birthday",
//       title: "Birthday",
//       dataIndex: "birthday",
//       editable: true,
//     },
//     {
//       key: "email",
//       title: "Email",
//       dataIndex: "email",
//       editable: true,
//     },
//     {
//       key: "rank",
//       title: "Rank",
//       dataIndex: "rank",
//       editable: true,
//     },

//     {
//       title: "Action",
//       dataIndex: "",
//       key: "delete",
//       render: (record: any) =>
//         setStudent.length >= 1 ? (
//           <Popconfirm
//             title="Sure to delete?"
//             onConfirm={() => handleDelete(record.id)}
//           >
//             <a>Delete</a>
//           </Popconfirm>
//         ) : null,
//     },
//     {
//       title: "Operation",
//       key: "operation",
//       dataIndex: "",
//         render: (record:any) => {
//           const editable = isEditing(record);
//           return editable ? (
//             <span>
//               <a
//                 href="javascript:;"
//                 onClick={() => save(record.id)}
//                 style={{
//                   marginRight: 8,
//                 }}
//               >
//                 Save
//               </a>
//               <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//                 <a>Cancel</a>
//               </Popconfirm>
//             </span>
//           ) : (
//             <Typography.Link disabled={editingKey!== ''} onClick={() => edit(record)}>
//               Edit
//             </Typography.Link>
//           );
//         },
//     },
//   ];
//   const [form] = Form.useForm();
//   const [student, setStudent] = useState([]);
//   const [editingKey, setEditingKey] = useState('');

//   const isEditing = (record:any) => record.key === editingKey;
//   const edit = (record:any) => {
//     form.setFieldsValue({
//       name: '',
//       birthday: '',
//       email: '',
//       rank:false,
//       ...record,
//     });
//     setEditingKey(record.key);
//   };

//   const cancel = () => {
//     setEditingKey('');
//   };

//   const save = async (key:any) => {
//     try {
//       const row = await form.validateFields();

//       const newData = [...student] as any;
//       fetch("http://localhost:12345/api/student/" + key, {
//         method: "PATCH",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(row),
//       })
//         .then((res) => res.json())
//         .then((response) => {
//           const index = newData.findIndex(
//             (student:any) => student["id"] === response.data["id"]
//           );
//           newData[index] = response.data;
//           setStudent(newData);
//           setEditingKey("");
//         });
//     } catch (errInfo) {
//       console.log("Validate Failed:", errInfo);
//     }
//   };

//   const handleDelete = async (key: any) => {
//     fetch("http://localhost:12345/api/student/" + key, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then((student) => {
//         setStudent(student.data);
//         console.log("dele success");
//       });
//   };
//   const getDataStudent = async () => {
//     fetch("http://localhost:12345/api/student")
//       .then((res) => res.json())
//       .then((student) => {
//         setStudent(student.data);
//         console.log(student.data);
//       });
//   };
//   useEffect(() => {
//     getDataStudent();
//   }, []);
//   return (
//     <div>
//       <Divider />
//       <Button>
//         <Link to="/add">Add student</Link>
//       </Button>
//       <Divider />
//       <Form form={form} component={false}>
//       <Table 
//         columns={columns}
//         dataSource={student} 
//         components={{
//             body: {
//               cell: EditableCell,
//             },
//           }}
//           bordered
//           rowClassName="editable-row"
//           pagination={{
//             onChange: cancel,
//           }}/>
//       </Form>
//     </div>
//   );
// }
// export default StudentList;