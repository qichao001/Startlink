import React, {Component} from 'react';
import {Button, List, Avatar, Checkbox, Spin} from 'antd';
import satLogo from '../assets/images/satellite.svg';

class SatelliteList extends Component {
    state = {
        selected: []
    }
    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        const {isLoading} = this.props;
        return (
            <div className="sat-list-box">
                <div className="btn-container">
                    <Button className="sat-list-btn"
                    type="primary"
                    size="large"
                    onClick={this.onShowSatPosOnMap}>
                        track on the map
                    </Button>
                </div>
                <hr/>
                {
                    isLoading
                        ?
                        <div className="spin-box"><Spin tip="loading..." size='large'></Spin></div>
                        :
                        <List  className="sat-list"
                               itemLayout="horizontal"
                               dataSource={satList}
                               renderItem={item =>
                                   <List.Item
                                       actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}>
                                       <List.Item.Meta
                                           avatar={<Avatar
                                               size={48}
                                               src={satLogo}/>}
                                           title={<p>{item.satname}</p>}
                                           description={`Launch Date: ${item.launchDate}`}
                                       />

                                   </List.Item>
                               }
                        />
                }

            </div>
        );
    }

    onShowSatPosOnMap = () => {
        this.props.onShowMap(this.state.selected);
    }

    onChange = e => {
        console.log("selected checkbox", e)
        // step1: get current selected sat Info
        const {dataInfo, checked} = e.target;
        const {selected} = this.state;

        // step2: add or remove current selected sat to/from selected array
        const list = this.addOrRemove(dataInfo, checked, selected);
        console.log(list)

        // step3: update selected state
        this.setState({
            selected: list
        })
    }

    addOrRemove = (item, status, list) => {
        // case1: check is true
        // -> item not in the list -> add item
        // -> item is in the list -> do nothing

        // case2: check is false
        // -> item is in the list -> remove item
        // -> item not in the list -> do nothing

        const found = list.some(entry => entry.satid === item.satid);
        console.log('found -> ', found);

        if (status && !found) {
            list = [...list, item];
            // list.push(item)
        }

        if (!status && found) {
            list = list.filter(entry => entry.satid !== item.satid);
        }

        return list;
    }
}

export default SatelliteList;