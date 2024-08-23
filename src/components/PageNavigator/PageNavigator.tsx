import React from "react";
import { Pagination } from "antd";
import "antd/dist/reset.css";

interface PageNavigatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className: string;
}

const PageNavigator: React.FC<PageNavigatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => (
  <div className="footer">
    <Pagination
      className={className}
      current={currentPage}
      total={totalPages * 10}
      pageSize={10}
      onChange={onPageChange}
      showSizeChanger={false}
      showQuickJumper
    />
  </div>
);

export default PageNavigator;
