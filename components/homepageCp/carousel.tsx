import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
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
            <Carousel autoplay autoplaySpeed={10000}>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
        </>

    )

}



