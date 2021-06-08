import "antd/dist/antd.css";
import { useEffect, useState } from "react";
// @ts-ignore
import { Link } from "react-router-dom";
import {Form,Table,Popconfirm,Typography,Input,Button,InputNumber,Divider,Space,} from "antd";

export default function StudentList() {
  const [form] = Form.useForm();
  const [student, setStudent] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  interface Item {
    key: string;
    name: string;
    birthday: Date;
    email: string;
    rank: false;
  }
  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
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
  const isEditing = (record: any) => record.id === editingKey;
  // const Edit = (record: any) => {
  //   form.setFieldsValue({
  //     name: "",
  //     birthday: "",
  //     email: "",
  //     rank: "",
  //     ...record,
  //   });
  //   setEditingKey(record.id);
  //   console.log('suss')
  //   window.location.href = "/edit"; 

  // };
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
      key:"edit",
      render: (text: string, record: any) => (
       <Button type="primary">
             <Link to={"/edit"} 
             >Edit</Link> 
          </Button>
      ),
      // render: (text: string, record: any) => {
      //   // const editable = isEditing(record);
      //   // return editable ? (
      //   //   <span>
      //   //     <Space>
      //   //     <Button type="primary" danger onClick={() => Save(record.id)}>
      //   //       Save
      //   //     </Button>

      //   //       <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
      //   //         <Button type="primary">Cancel</Button>
      //   //       </Popconfirm>
      //   //     </Space>
      //   //   </span>
      //   // ) : (
          // <Button type="primary">
          //    <Link to="/edit" onClick={() =>(record.id)}>Edit</Link> 
          // </Button>
      //  // );
      // },
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
  const Save = async (key: any) => {
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
            (student: any) => student["id"] === response.data["id"]
          );
          newData[index] = response.data;
          setStudent(newData);
          setEditingKey("");
        });
    } catch (err) {
      console.log("Failed:", err);
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
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex === "name" ? "text" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const expandedRowRender = (record: any) => {
    return (
      <p>
        {" "}
        Wellcome<b>{record.name}</b> Sinh ngày:<b>{record.birthday} </b>Email:
        <b>{record.email}</b> Học lực:<b>{record.rank}</b>
      </p>
    );
  };
  return (
    <div style={{ margin: 100 }}>
      <Button type="primary">
        <Link to="/add">Add student list</Link>
      </Button>
      <Divider />
      <Form form={form} component={false}>
        <Table
          rowKey="id"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          dataSource={student}
          expandable={{
            expandedRowRender: expandedRowRender,
          }}
        />
      </Form>
    </div>
  );
}
