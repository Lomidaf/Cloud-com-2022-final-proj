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
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import AuthStore from "../../../mobx/AuthStore";
import { useRouter } from "next/router";

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
  const [idToken, setIdToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    AuthStore.user?.getIdToken().then((token) => {
      setIdToken(token)
    })
  }, []);

  const onFinish = async (values: any) => {
    const payload = {
      type: values.type,
      title: values.fundraisingTitle,
      goal: values.raise,
      bankAccount: values.accountNumber,
      accountOwner: `${values.ownerFirstname} ${values.ownerLastname}`,
      accountCompany: values.bankName,
      description: values.description,
      image: fileList.length>0 ? fileList[0].response : undefined,
    };
    // console.log(payload);
    const result = await fetch(
      (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000") +
        "/api/fundraiser",
      {
        method: "POST",
        headers: await AuthStore.getAuthHeader(),
        body: JSON.stringify(payload),
      }
    );
    // console.log(result.json());
    router.push("/fundme/owner");
  };

  const uploadBackendProps = {
    name: "file",
    action:
      (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000") +
      "/api/file/Upload",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    fileList,
    beforeUpload: async(file: any) => {
      AuthStore.user?.getIdToken().then((token) => {
        setIdToken(token)
      })
      return file;
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        // console.log(idToken);
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // console.log(`${info.file.name} file uploaded successfully`);
        setFileList([info.file])
        return
      } else if (info.file.status === "error") {
        // console.log(`${info.file.name} file upload failed.`);
      }
      setFileList(info.fileList);
    },
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
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
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
              <Upload {...uploadBackendProps}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </ImgCrop>
          </Form.Item>
          {fileList.length > 0 && (
            <Form.Item label="Preview Image">
              <Image src={fileList[0].response?.path} />
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
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item
            label="Account Number"
            rules={[{ required: true }]}
            name={"accountNumber"}
          >
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item label="Owner Name" rules={[{ required: true }]}>
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
