import { Carousel } from 'antd';

const contentStyle = {
    height: '500px',
    width: '80%',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#364d79',
    margin: '10px auto'
};

export default function CarouselCp() {
    return (
        <>
            <Carousel autoplay autoplaySpeed={3000}>
                <div>
                    <div style={contentStyle}>
                        <img src="https://img1.baidu.com/it/u=4272252879,2893005019&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500" alt="" />
                    </div>
                </div>
                <div>
                    <div style={contentStyle}>
                        <img src="https://img2.baidu.com/it/u=2243990402,2733474551&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500" alt="" />
                    </div>
                </div>
                <div>
                    <div style={contentStyle}>
                        <img src="https://img0.baidu.com/it/u=2693029244,2303772535&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500" alt="" />
                    </div>
                </div>
                <div>
                    <div style={contentStyle}>
                        <img src="https://img2.baidu.com/it/u=4029322426,305994480&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500" alt="" />
                    </div>
                </div>
            </Carousel>
        </>

    )

}



