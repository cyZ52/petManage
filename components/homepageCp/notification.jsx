import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, List } from 'antd';

export default function Notification() {
    const [notifyData, setNotifyData] = useState([]);

    async function getNotifies() {
        try {
            const response = await axios.get('http://localhost:3001/notify/getNotifies');

            // 打印服务器返回的json数据
            console.log('服务器返回的json数据', response);

            const data = response.data;

            setNotifyData(data.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }

    }

    useEffect(() => {
        getNotifies();
    },[])

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={notifyData}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            // avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                            // avatar={<Avatar/>}
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </>
    )
}
