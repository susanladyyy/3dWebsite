import React, { useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    addBasePlugins,
    mobileAndTabletCheck
} from "webgi";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// https://github.com/pixotronics/webgi-vanilla-starter/blob/master/src/index.ts
// 42:08

const WebGiViewer = () => {

    const canvasRef = useRef(null)

    return (
        <div id="webgi-canvas-container">
            <canvas id="webgi-canvas" ref={canvasRef}>

            </canvas>
        </div>
    )
}

export default WebGiViewer
