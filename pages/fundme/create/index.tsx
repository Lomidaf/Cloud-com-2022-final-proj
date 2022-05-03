import type { NextPage } from "next";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Typography,
  InputNumber,
  Upload,
  Image,
} from "antd";
import withAuth from "../../../components/WithAuth";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import ImgCrop from "antd-img-crop";

const fundraisingTypes = [
  "Accidents & Emergencies",
  "Animals & Pets",
  "Babies, Kids & Family",
  "Business & Entrepreneurs",
  "Celebrations & Events",
  "Community & Neighbors",
  "Competitions & Pageants",
  "Creative Arts, Music & Film",
  "Dreams, Hopes & Wishes",
  "Education & Learning",
  "Funerals & Memorials",
  "Medical, Illness & Healing",
  "Missions, Faith & Church",
  "Sports, Teams & Clubs",
  "Travel & Adventure",
  "Volunteer & Service",
  "Weddings & Honeymoons",
  "Other",
];

const CreateFundMePage: NextPage = () => {
  const [fileList, setFileList]: any[] = useState([]);

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

  return (
    <Row justify="center">
      <Col span={16}>
        <Form
          name="complex-form"
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ padding: "50px 0 0 0", marginBottom: "20px" }}
        >
          <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
            Your Information
          </Typography.Title>
          <Form.Item label="Your Name" style={{ marginBottom: 0 }}>
            <Form.Item
              rules={[{ required: true }]}
              name={"firstname"}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              name={"lastname"}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name={"address"}
            rules={[{ required: true }]}
            label="Your Address"
          >
            <Input.TextArea />
          </Form.Item>
          <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
            Your Fundraising
          </Typography.Title>
          <Form.Item
            label="Your Fundraising Title"
            rules={[{ required: true }]}
            name={"fundraisingTitle"}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="gender"
            label="Your Fundraising Type"
            rules={[
              {
                required: true,
                message: "Please select what your fundraising for?!",
              },
            ]}
          >
            <Select placeholder="Choose category" style={{ width: "300px" }}>
              {fundraisingTypes.map((value) => {
                return (
                  <Select.Option key={value} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name={"description"}
            rules={[{ required: true }]}
            label="Description"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={"raise"}
            rules={[{ required: true }]}
            label="Fundraising Goals"
          >
            <InputNumber
              addonBefore="฿"
              addonAfter="BATH"
              style={{ width: "300px" }}
            />
          </Form.Item>
          {/* Example: https://codesandbox.io/s/x724lxyl24 */}
          <Form.Item name={"fundraisingImage"} label="Fundraising image">
            <ImgCrop aspect={1.8}>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </ImgCrop>
          </Form.Item>
          {fileList.length > 0 && (
            <Form.Item label="Preview Image">
              <Image src={URL.createObjectURL(fileList[0])} />
            </Form.Item>
          )}
          <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
            Fundraising Bank Account
          </Typography.Title>
          <Form.Item
            label="Bank Name"
            rules={[{ required: true }]}
            name={"bankName"}
          >
            <Input style={{ width: "300px" }}/>
          </Form.Item>
          <Form.Item
            label="Account Number"
            rules={[{ required: true }]}
            name={"accountNumber"}
          >
            <Input style={{ width: "300px" }}/>
          </Form.Item>
          <Form.Item
            label="Owner Name"
            rules={[{ required: true }]}
          >
            <Form.Item
              rules={[{ required: true }]}
              name={"ownerFirstname"}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              name={"ownerLastname"}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ float: "right", marginTop: "20px" }}
            >
              Create Fundraising
            </Button>
            
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default withAuth(CreateFundMePage);
