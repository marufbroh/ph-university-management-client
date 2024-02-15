import type { TableColumnsType, TableProps } from "antd";
import { Button, Progress, Table } from "antd";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParam } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";

export type TTableData = Pick<
  TAcademicSemester,
  "name" | "startMonth" | "endMonth" | "year"
>;

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
    filters: [
      {
        text: "Autumn",
        value: "Autumn",
      },
      {
        text: "Summer",
        value: "Summer",
      },
      {
        text: "Fall",
        value: "Fall",
      },
    ],
  },
  {
    title: "Year",
    key: "year",
    dataIndex: "year",
  },
  {
    title: "Start Month",
    key: "startMonth",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    key: "endMonth",
    dataIndex: "endMonth",
  },
  {
    title: "Action",
    key: "x",
    render: () => {
      return (
        <div>
          <Button>Update</Button>
        </div>
      );
    },
  },
];

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery(params);

  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
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
