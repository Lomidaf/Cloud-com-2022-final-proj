import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Typography,
  Upload,
  Image,
  Descriptions,
  InputNumber,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import withAuth from "../../../components/WithAuth";
import { useState } from "react";
import moment from "moment";

const fundraisingBankName = "Krung Thai";
const fundraisingAccountNumber = "123456789";
const fundraisingOwnerName = "Grape jason";
const fundraisingTitle = "This is Anya fundraising";

const DonatePage: NextPage = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [fileList, setFileList]: any[] = useState([]);
  const [donationAmount, setDonationAmount] = useState(0);
  const [transactionDate, setTransactionDate] = useState(moment());

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
  };

  const uploadProps = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  // Mock
  const onChange = (value: any, dateString: any): void => {
    // console.log(transactionDate);
    setTransactionDate(value);
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (value: any): void => {
    console.log("onOk: ", value);
  };

  return (
    <Row
      justify="center"
      style={{ padding: "50px 0 0 0", marginBottom: "20px" }}
    >
      <Col span={16}>
        <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
          Fundraising Bank Account
        </Typography.Title>
        <Descriptions
          bordered
          contentStyle={{ backgroundColor: "white" }}
          labelStyle={{ backgroundColor: "#8c8c8c", color: "white" }}
          style={{ marginBottom: "20px" }}
        >
          <Descriptions.Item label="Bank Name">
            {fundraisingBankName}
          </Descriptions.Item>
          <Descriptions.Item label="Account Number">
            {fundraisingAccountNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Owner Name">
            {fundraisingOwnerName}
          </Descriptions.Item>
        </Descriptions>
        <Form
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
            Donation
          </Typography.Title>
          <Form.Item label="Donate To">
            <Input
              value={fundraisingTitle}
              style={{ color: "#8c8c8c" }}
              disabled
            />
          </Form.Item>
          <Form.Item
            name={"bankTransactionSlip"}
            label="Bank Transaction Slip"
            rules={[
              { required: true, message: "Transaction slip is required" },
            ]}
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          {fileList.length > 0 && (
            <>
              <Form.Item label="Preview Slip Image">
                <Image
                  src={URL.createObjectURL(fileList[0])}
                  style={{ maxWidth: "450px", maxHeight: "800px" }}
                />
              </Form.Item>
              <Form.Item
                name={"donationAmount"}
                label="Donate Amount"
                rules={[
                  { required: true, message: "Donation amount is required" },
                ]}
              >
                <InputNumber
                  addonBefore="฿"
                  addonAfter="BATH"
                  style={{ width: "250px" }}
                  value={donationAmount}
                  // onChange={(e) => setDonationAmount(e)}
                />
              </Form.Item>
              <Form.Item
                label="Sender Bank Name"
                name={"senderBankName"}
                rules={[
                  { required: true, message: "Sender Bank name is required" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Sender Full Name"
                name={"senderName"}
                rules={[
                  { required: true, message: "Sender Full name is required" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Transaction Date"
                name={"transactionDate"}
                rules={[
                  { required: true, message: "Transaction Date is required" },
                ]}
              >
                <div>
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  value={transactionDate}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange}
                  onOk={onOk}
                />
                </div>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ float: "right", marginTop: "20px" }}
                >
                  Donate
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Col>
    </Row>
  );
};

export default withAuth(DonatePage);
