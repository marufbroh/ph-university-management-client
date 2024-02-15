import type { TableColumnsType, TableProps } from "antd";
import { Button, Progress, Space, Table } from "antd";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";

export type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo"
>;

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    key: "name",
    dataIndex: "fullName",
  },

  {
    title: "Roll No.",
    key: "id",
    dataIndex: "id",
  },
  {
    title: "Email",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "Contact No.",
    key: "contactNo",
    dataIndex: "contactNo",
  },
  {
    title: "Action",
    key: "x",
    render: (item) => {
      console.log(item);
      return (
        <Space>
          <Link to={`/admin/student-data/${item.key}`}>
            <Button>Details</Button>
          </Link>
          <Button>Update</Button>
          <Button>Block</Button>
        </Space>
      );
    },
    width: "1%",
  },
];

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [ page, setPage] = useState(1)
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([{ name: "limit", value: 3 },
  {name: "page", value: page},
  {name: "sort", value: "id"},
  ...params]);

  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, email, contactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      setParams(queryParams);
    }
  };

  if (isLoading) {
    const twoColors = { "0%": "#108ee9", "100%": "#87d068" };
    return <Progress percent={99.9} strokeColor={twoColors} />;
  }

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default StudentData;
