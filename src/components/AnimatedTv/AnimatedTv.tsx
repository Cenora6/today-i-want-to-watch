import React from 'react';

export interface AnimatedTvProps {
    width: number,
    height: number
}

function AnimatedTv(props: AnimatedTvProps) {

    const xCoordinates = props.width * 100 / window.innerWidth+"%";
    const yCoordinates = props.height * 100 / window.innerHeight+"%";

    const ballStyle = {
        left: xCoordinates,
        top: yCoordinates,
        transform: "translate(-"+xCoordinates+",-"+yCoordinates+")"
    };

    return (
        <section className='tv'>
            <div className='tv__top'>
                <div className='tv__top__left'></div>
                <div className='tv__top__right'></div>
            </div>
            <div className='tv__background'>
                <div className='tv__background__screen'>
                    <div className='tv__background__screen__face'>
                        <div className='tv__background__screen__face__eyes'>
                            <div className='eyebrow-left'></div>
                            <div className='tv__background__screen__face__eyes__left'>
                                <div className='ball' style={ballStyle}></div>
                            </div>
                            <div className='eyebrow-right'></div>
                            <div className='tv__background__screen__face__eyes__right'>
                                <div className='ball' style={ballStyle}></div>
                            </div>
                        </div>
                        <div className='tv__background__screen__face__mouth'></div>
                    </div>
                </div>
            </div>
            <div className='tv__buttons'>
                <div className='tv__buttons__round'>
                    <div className='tv__buttons__round__1'></div>
                    <div className='tv__buttons__round__2'></div>
                </div>
                <div className='tv__buttons__lines'>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line'></div>
                </div>
            </div>
        </section>
    )
}

export default AnimatedTv;
