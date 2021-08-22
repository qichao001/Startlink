import React, {Component} from 'react';
import {
    Form,
    Button,
    InputNumber
} from 'antd';

class SatSettingForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 11 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };

        return (
            <div>
                <Form {...formItemLayout}
                      onSubmit={this.onShowSatellite}
                      className="sat-setting">

                    <Form.Item label='Longitude(degrees)'>
                        {getFieldDecorator('longitude', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your longitude',
                                },
                            ],
                        })(<InputNumber min={-180}
                                        max={180}
                                        placeholder={'Please input longitude'}
                                        style={{width:'100%'}}/>)}

                    </Form.Item>
                    <Form.Item label='Latitude(degrees)'>
                        {getFieldDecorator('Latitude', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Latitude',
                                },
                            ],
                        })(<InputNumber min={-90}
                                        max={90}
                                        placeholder={'Please input latitude'}
                                        style={{width:'100%'}}/>)}
                    </Form.Item>

                    <Form.Item label="Elevation(meters)">
                        {
                            getFieldDecorator("elevation", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your Elevation",
                                    }
                                ],
                            })(<InputNumber placeholder="Please input Elevation"
                                            min={-413} max={8850}
                                            style={{width: "100%"}}
                            />)
                        }
                    </Form.Item>

                    <Form.Item label="Altitude(degrees)">
                        {
                            getFieldDecorator("altitude", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your Altitude",
                                    }
                                ],
                            })(<InputNumber placeholder="Please input Altitude"
                                            min={0} max={90}
                                            style={{width: "100%"}}
                            /> )
                        }
                    </Form.Item>

                    <Form.Item label="Duration(secs)">
                        {
                            getFieldDecorator("duration", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your Duration",
                                    }
                                ],
                            })(<InputNumber placeholder="Please input Duration" min={0} max={90} style={{width: "100%"}} />)
                        }
                    </Form.Item>

                    <Form.Item className="show-nearby">
                        <Button type="primary"
                                htmlType="submit"
                        >Find Nearby Satellite</Button>
                    </Form.Item>


                </Form>

            </div>
        );
    }

    onShowSatellite = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values);
                this.props.onShow(values);
            }
        })
    }

}
const SatSetting = Form.create()(SatSettingForm);
export default SatSetting;