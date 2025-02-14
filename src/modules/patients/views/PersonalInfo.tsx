import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd'
import usePatientPersonalInfo from 'src/modules/patients/hooks/usePatientPersonalInfo.ts'
import { useParams } from 'react-router-dom'
import { useAuth } from 'src/providers/AuthProvider.tsx'
import { UserRole } from 'api/auth/types.ts'

const { Option } = Select

const PersonalInfo = () => {
  const [form] = Form.useForm()
  const params = useParams()
  const patientId = params.id
  const { getAuthUser } = useAuth()
  const user = getAuthUser()
  const isDoctor = user && user.roles === undefined ? false : user?.roles.includes(UserRole.DOCTOR)
  const {
    onFinish,
    setPhoneNumber,
    isModalVisible,
    handleOk,
    onFieldsChange,
    handleSendCode,
    handleCancel,
    isFormDirty,
    phoneNumber,
    state
  } = usePatientPersonalInfo({ id: patientId, isDoctor, form })
  const [otpForm] = Form.useForm()

  return (
    <>
      <Form
        form={form}
        onFinish={values => onFinish(values)}
        layout='vertical'
        initialValues={state.data}
        onFieldsChange={() => onFieldsChange()}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='სახელი'
              name='firstName'
              rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ სახელი!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='გვარი'
              name='lastName'
              rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ გვარი!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='დაბადების თარიღი'
              name='dob'
              rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ დაბადების თარიღი!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='ქვეყანა'
              name='country'
              rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ ქვეყნის დასახელება!' }]}
            >
              <Select>
                <Option value='Georgia'>საქართველო</Option>
                <Option value='USA'>აშშ</Option>
                <Option value='Canada'>კანადა</Option>
                <Option value='UK'>დიდი ბრიტანეთი</Option>
                <Option value='Australia'>ავსტრალია</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='სქესი'
              name='gender'
              rules={[{ required: true, message: 'გთხოვთ აირჩიოთ სქესი!' }]}
            >
              <Select>
                <Option value='male'>მამრობითი</Option>
                <Option value='female'>მდედრობითი</Option>
                <Option value='other'>სხვა</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='ტელეფონის ნომერი'
              name='phone'
              rules={[
                { required: true, message: 'გთხოვთ შეიყვანოთ ტელეფონის ნომერი!' },
                {
                  pattern: /^\d{9}$/,
                  message: 'ტელეფონის ნომერი უნდა შედგებოდეს 9 ციფრისგან!'
                }
              ]}
            >
              <Input
                type='number'
                onChange={e => setPhoneNumber(e.target.value)}
                addonAfter={
                  <Button
                    type='link'
                    onClick={handleSendCode}
                    disabled={phoneNumber.length !== 9}
                  >
                                    კოდის გაგზავნა
                  </Button>
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className='mt-4'>
        <Button
          type='primary'
          htmlType='submit'
          onClick={() => form.submit()}
          disabled={patientId ? !isFormDirty : false}
        >
                პაციენტის {patientId ? 'განახლება' : 'შენახვა'}
        </Button>
      </div>
      <Modal
        title='OTP ვერიფიკაცია'
        open={isModalVisible}
        onOk={() => handleOk()}
        onCancel={handleCancel}
      >
        <Form form={otpForm}>
          <Form.Item
            label='OTP კოდი'
            name='otp'
            rules={[
              { required: true, message: 'გთხოვთ შეიყვანოთ OTP კოდი!' },
              {
                pattern: /^\d{6}$/,
                message: 'OTP უნდა შედგებოდეს 6 ციფრისგან!'
              }
            ]}
          >
            <Input type='number' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default PersonalInfo
