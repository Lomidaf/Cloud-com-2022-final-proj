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
  FormInstance,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import withAuth from "../../../components/WithAuth";
import { useEffect, useState } from "react";
import moment from "moment";
import AuthStore from "../../../mobx/AuthStore";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useForm } from "antd/lib/form/Form";

// const fundraisingBankName = "Krung Thai";
// const fundraisingAccountNumber = "123456789";
// const fundraisingOwnerName = "Grape jason";
// const fundraisingTitle = "This is Anya fundraising";


const thaiMonth = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];
const engMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const StringToDate = (stringDate: string) => {
  for (let i = 0; i < thaiMonth.length; i++) {
    stringDate = stringDate.replace(thaiMonth[i],engMonth[i]);
  }
  stringDate += " GMT+0700"
  return moment(stringDate);
};

const DonatePage: NextPage = () => {
  const [form] = useForm();
  const router = useRouter();
  const { uid } = router.query;
  const [fundraising, setFundraising] = useState({});
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList]: any[] = useState([]);

  const [accountCompany, setAccountCompany] = useState("");
  const [accountName, setAccountName] = useState("");
  const [donationAmount, setDonationAmount] = useState(0);
  const [transactionDate, setTransactionDate] = useState(moment());
  const [idToken, setIdToken] = useState("");

  // Input state

  useEffect(() => {
    setLoading(true);
    AuthStore.user?.getIdToken().then((token) => {
      setIdToken(token);
    });
    fetch(
      (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000") +
        `/api/fundraiser/${uid}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFundraising(data["fundraiser"]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
      });
  }, []);

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
        const payload = { receipt: info.file.response };
        console.log(payload);
        fetch(
          (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000") +
            `/api/donation/label`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(payload),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            const autofill = {
              transactionDate: StringToDate(data.date),
              senderBankName:data.accountCompany,
              senderName:data.accountName,
              donationAmount:data.amount
            }
            console.log(autofill)
            const fields = form.getFieldsValue()
            const {projects} = fields
            form.setFieldsValue({...projects, ...autofill})

          })
          .catch((err) => {
            // setLoading(true);
            console.log("ERROR VISION FETCH");
          });
        return;
      } else if (info.file.status === "error") {
        // console.log(`${info.file.name} file upload failed.`);
      }
      setFileList(info.fileList);
    },
  };

  const onFinish = async (values: any) => {
    // console.log("Received values of form: ", values);
    const payload = {
      amount: values.donationAmount,
      description: "",
      accountName: values.senderName,
      accountCompany: values.senderBankName,
      date: values.transactionDate.toString(),
      receipt: fileList.length > 0 ? fileList[0].response : undefined,
      fundraiser: {
        id: fundraising.fundraiser_id,
      },
      // fundraiser: fundraising
    };
    // console.log(payload)
    const result = await fetch(
      (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000") +
        "/api/donation",
      {
        method: "POST",
        // headers: await AuthStore.getAuthHeader(),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(payload),
      }
    );
    console.log(result);
    router.push(`/fundme/${uid}`);
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
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
                {fundraising.fundraiser_accountCompany}
              </Descriptions.Item>
              <Descriptions.Item label="Account Number">
                {fundraising.fundraiser_bankAccount}
              </Descriptions.Item>
              <Descriptions.Item label="Owner Name">
                {fundraising.fundraiser_accountOwner}
              </Descriptions.Item>
            </Descriptions>
            <Form
              form={form}
              onFinish={onFinish}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
                Donation
              </Typography.Title>
              <Form.Item label="Donate To">
                <Input
                  value={fundraising.fundraiser_title}
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
                      src={fileList[0].response?.path}
                      style={{ maxWidth: "450px", maxHeight: "800px" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={"donationAmount"}
                    label="Donate Amount"
                    rules={[
                      {
                        required: true,
                        message: "Donation amount is required",
                      },
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
                      {
                        required: true,
                        message: "Sender Bank name is required",
                      },
                    ]}
                  >
                    <Input value={accountCompany} onChange={(value) => setAccountCompany(value)}/>
                  </Form.Item>
                  <Form.Item
                    label="Sender Full Name"
                    name={"senderName"}
                    rules={[
                      {
                        required: true,
                        message: "Sender Full name is required",
                      },
                    ]}
                  >
                    <Input value={accountName} onChange={value => setAccountName(value)}/>
                  </Form.Item>
                  <Form.Item
                    label="Transaction Date"
                    name={"transactionDate"}
                    rules={[
                      {
                        required: true,
                        message: "Transaction Date is required",
                      },
                    ]}
                  >
                    <DatePicker
                      showTime={{ format: "HH:mm" }}
                      value={transactionDate}
                      format="YYYY-MM-DD HH:mm"
                    />
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
      )}
    </>
  );
};

export default withAuth(DonatePage);
