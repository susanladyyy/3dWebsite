import React, { useRef, useState, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react'
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
    mobileAndTabletCheck,
    AssetManagerBasicPopupPlugin,
} from "webgi";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// https://github.com/pixotronics/webgi-vanilla-starter/blob/master/src/index.ts
// 42:08

gsap.registerPlugin(ScrollTrigger)

const WebGiViewer = () => {

    const canvasRef = useRef(null)

    const setupViewer = useCallback(async () => {

        // Initialize the viewer
        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        })

        const manager = await viewer.addPlugin(AssetManagerPlugin)
        // viewer.renderer.renderScale = Math.min(window.devicePixelRatio, 2)

        const camera = viewer.scene.activeCamera
        const position = camera.position
        const target = camera.target

        await viewer.addPlugin(AssetManagerBasicPopupPlugin)

        // Add plugins individually.
        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        // await viewer.addPlugin(DiamondPlugin)
        // await viewer.addPlugin(FrameFadePlugin)
        // await viewer.addPlugin(GLTFAnimationPlugin)
        // await viewer.addPlugin(GroundPlugin)
        await viewer.addPlugin(BloomPlugin)
        // await viewer.addPlugin(TemporalAAPlugin)
        // await viewer.addPlugin(AnisotropyPlugin)
        // and many more...

        // or use this to add all main ones at once.
        // await addBasePlugins(viewer) // check the source: https://codepen.io/repalash/pen/JjLxGmy for the list of plugins added.

        // Required for downloading files from the UI
        // await viewer.addPlugin(FileTransferPlugin)

        // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
        // await viewer.addPlugin(CanvasSnipperPlugin)
        viewer.renderer.refreshPipeline()

        // Import and add a GLB file.
        await manager.addFromPath("scene-black.glb")
        viewer.getPlugin(TonemapPlugin).config.clipBackground = true
        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false })
        window.scrollTo(0, 0)
        let needsUpdate = true
        viewer.addEventListener("preFrame", () => {
            if (needsUpdate) {
                camera.positionTargetUpdated(true)
                needsUpdate = false
            }
        })
    }, []);

    useEffect(() => {
        setupViewer()
    }, [])

    return (
        <div id="webgi-canvas-container">
            <canvas id="webgi-canvas" ref={canvasRef}>

            </canvas>
        </div>
    )
}

export default WebGiViewer
