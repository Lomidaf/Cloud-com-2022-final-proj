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
import withAuth from "../../../../components/WithAuth";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { useRouter } from "next/router";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import AuthStore from "../../../../mobx/AuthStore";

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

// const defaultFirstName = "Dee"
// const defaultLastName = "Doo"
// const defaultAddress = "HELLO THERE"
// const defaultFundraisingTitle = "For Me Of Course"
// const defaultFundraisingType = "Weddings & Honeymoons"
// const defaultDescription = "This is for temp"
// const defaultFundraisingGoal = 10000
// const defaultBankName = "Krung Thai"
// const defaultAccountNumber = "111111111"
// const defaultOwnerFirstName = "Dee"
// const defaultOwnerLastName = "Doo"

const EditFundMePage: NextPage = () => {
  const router = useRouter();
  const [fileList, setFileList]: any[] = useState([]);
  const { uid } = router.query;
  const [fundraising, setFundraising] = useState({});
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(
      (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000") +
        `/api/fundraiser/${uid}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setFundraising(data["fundraiser"]);
        setFileList([
          {
            name: data["fundraiser"].image_title,
            response: {
              id: data["fundraiser"].image_id,
              path: data["fundraiser"].image_path,
            },
          },
        ]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
      });

    AuthStore.user?.getIdToken().then((token) => {
      setIdToken(token);
    });
  }, []);

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const payload = {
      type: values.type,
      title: values.fundraisingTitle,
      goal: values.raise,
      bankAccount: values.accountNumber,
      accountOwner: `${values.ownerFirstname} ${values.ownerLastname}`,
      accountCompany: values.bankName,
      description: values.description,
      image: fileList.length>0 ? fileList[0].response : undefined,
    }
    const result = await fetch(
      (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000") +
        `/api/fundraiser/${uid}`,
      {
        method: "PUT",
        headers: await AuthStore.getAuthHeader(),
        body: JSON.stringify(payload),
      }
    );
    console.log(result)
    router.push(`/fundme/owner/${uid}`);
  };

  const uploadProps = {
    name: "file",
    action:
      (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000") +
      "/api/file/Upload",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    fileList,
    beforeUpload: async (file: any) => {
      AuthStore.user?.getIdToken().then((token) => {
        setIdToken(token);
      });
      return file;
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        // console.log(idToken);
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // console.log(`${info.file.name} file uploaded successfully`);
        setFileList([info.file]);
        console.log(info.file);
        return;
      } else if (info.file.status === "error") {
        // console.log(`${info.file.name} file upload failed.`);
      }
      setFileList(info.fileList);
    },
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
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
                Your Fundraising
              </Typography.Title>
              <Form.Item
                label="Your Fundraising Title"
                rules={[{ required: true }]}
                name={"fundraisingTitle"}
                initialValue={fundraising.fundraiser_title}
              >
                <Input />
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
                initialValue={fundraising.fundraiser_type}
              >
                <Select
                  placeholder="Choose category"
                  style={{ width: "300px" }}
                  defaultValue={fundraising.fundraiser_type}
                >
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
                initialValue={fundraising.fundraiser_description}
              >
                <Input.TextArea
                  defaultValue={fundraising.fundraiser_description}
                />
              </Form.Item>
              <Form.Item
                name={"raise"}
                rules={[{ required: true }]}
                initialValue={fundraising.fundraiser_goal}
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
                initialValue={fundraising.fundraiser_accountCompany}
              >
                <Input style={{ width: "300px" }} />
              </Form.Item>
              <Form.Item
                label="Account Number"
                rules={[{ required: true }]}
                name={"accountNumber"}
                initialValue={fundraising.fundraiser_bankAccount}
              >
                <Input style={{ width: "300px" }} />
              </Form.Item>
              <Form.Item label="Owner Name" rules={[{ required: true }]}>
                <Form.Item
                  rules={[{ required: true }]}
                  name={"ownerFirstname"}
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                  initialValue={
                    fundraising.fundraiser_accountOwner.split(" ")[0]
                  }
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
                  initialValue={
                    fundraising.fundraiser_accountOwner.split(" ").length > 1
                      ? fundraising.fundraiser_accountOwner.split(" ")[1]
                      : ""
                  }
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
                  Edit Fundraising
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

export default withAuth(EditFundMePage);
