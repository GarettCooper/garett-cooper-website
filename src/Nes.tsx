import React, {RefObject} from "react";
import {Page, PageProps} from "./App";
import Dropzone from "react-dropzone";
import './css/Nes.css'
import {BrowserView, MobileOnlyView} from "react-device-detect";
import SplashScreen from "./images/GC_NES_Emulator_Splash.png"

interface NesPageState {
    romLoaded: boolean,
    romFile?: File,
    wasm: typeof import("gc_nes_web")
    nesCanvas?: RefObject<HTMLCanvasElement>,
    nesScaling: number
}

export default class NesPage extends React.Component<PageProps, NesPageState>{

    nesCanvas: RefObject<HTMLCanvasElement>;
    nesScaling: number;
    offscreenCanvasSupport: boolean;
    constructor(props: Readonly<PageProps>) {
        super(props);
        this.nesCanvas = React.createRef();
        this.controlInput = 0;
        this.nesScaling = 2;

        try {
            let offscreenCanvas = new OffscreenCanvas(256, 240);
            offscreenCanvas.getContext("2d");
            this.offscreenCanvasSupport = true;
        } catch {
            this.offscreenCanvasSupport = false;
        }
        console.log("Offscreen canvas support: " + this.offscreenCanvasSupport);
    }

    async componentDidMount() {
        document.title = "GC NES Emulator"
        this.props.stateUpdateCallback({page: Page.NesEmulator});
        const wasm = await import ("gc_nes_web");
        this.setState({
            romLoaded: false,
            wasm,
            nesCanvas: React.createRef(),
            nesScaling: 2
        });

        // TODO: Splash screen

        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDownHandler.bind(this));
        document.removeEventListener("keyup", this.keyUpHandler.bind(this));
    }

    async loadRoms(file: File) {
        if (file) {
            this.setState({romLoaded: false})
            console.log(file.name);
            const reader = new FileReader()

            reader.onabort = () => console.warn('File reading was aborted')
            reader.onerror = () => console.error('File reading has failed')
            reader.onload = async () => {
                let rom = new Uint8Array(reader.result as ArrayBuffer);
                this.runGame(rom);
            }
            reader.readAsArrayBuffer(file);
        }
    }

    async runGame(rom: Uint8Array) {
        let nes = this.state.wasm.nes(rom);
        this.setState({romLoaded: true})
        let offscreenCanvas = new OffscreenCanvas(256, 240);
        let offscreenCanvasContext = offscreenCanvas.getContext("2d");
        let mainCanvasContext = this.nesCanvas?.current?.getContext("2d");
        this.setScaling(this.state.nesScaling)
        let imageData = offscreenCanvasContext?.createImageData(256, 240);
        if (imageData && offscreenCanvasContext && mainCanvasContext) {
            await new Promise( resolve => setTimeout(resolve, 500) );
            while (this.state.romLoaded) {
                let frameStart = performance.now();
                nes.update_controller_one(this.controlInput);
                imageData.data.set(nes.frame());
                offscreenCanvasContext.putImageData(imageData, 0, 0);
                // Set scaling every frame to resolve issue where scaling buttons would need to be clicked twice.
                // Not the best solution, but works for now.
                this.setScaling(this.state.nesScaling);
                // console.log(performance.now() - frameStart)
                mainCanvasContext.drawImage(offscreenCanvas, 0, 0);
                // TODO: Warning if frame is too slow
                await new Promise( resolve => setTimeout(resolve, 16 - (performance.now() - frameStart)) );
            }
        }
    }

    render() {
        this.nesScaling = this.state?.nesScaling ?? this.nesScaling;
        return (
            <div className="nes-page page">
                <BrowserView>
                    { this.renderNesPlayerIfOffscreenCanvasSupported() }
                </BrowserView>
                <MobileOnlyView>
                    <div className="nes-info">
                        <h1>The GC NES Emulator</h1>
                        Sorry, the GC NES Emulator isn't currently supported on Mobile Platforms. Try opening this link
                        on your laptop or desktop.
                    </div>
                </MobileOnlyView>
            </div>
        )
    }

    private renderNesPlayerIfOffscreenCanvasSupported() {
        if (this.offscreenCanvasSupport) {
            return (
                <div>
                    <div className="nes-info">
                        <h1>The GC NES Emulator</h1>
                        Try playing my Nintendo Entertainment System Emulator, running right in your browser through the power of Rust and WebAssembly!
                    </div>
                    <div className="nes-game">
                            <span className="nes-game-items">
                                <div className="nes-canvas-wrapper">
                                    <canvas id="nes-canvas" style={{width: 256 * this.nesScaling, height: 240 * this.nesScaling}}  width={256 * this.nesScaling} height={240 * this.nesScaling} ref={this.nesCanvas}/>
                                </div>
                                <div className="nes-game-controls">
                                    <div className="nes-game-scale-buttons">
                                        <div className="nes-game-scale-header"><b>Scaling:</b></div>
                                        <button className="nes-game-scale-button" onClick={() => this.setScaling.bind(this)(1)}>1x</button>
                                        <button className="nes-game-scale-button" onClick={() => this.setScaling.bind(this)(2)}>2x</button>
                                        <button className="nes-game-scale-button" onClick={() => this.setScaling.bind(this)(4)}>4x</button>
                                    </div>
                                    <Dropzone onDrop={acceptedFiles => this.loadRoms(acceptedFiles[0])} accept=".nes">
                                        {({getRootProps, getInputProps}) => (
                                            <div {...getRootProps()} className="nes-rom-upload-area">
                                                <input {...getInputProps()} />
                                                <span className="nes-rom-upload-text">Drag or click to upload a .nes file</span>
                                            </div>
                                        )}
                                    </Dropzone>
                                </div>
                            </span>
                    </div>
                    <div className="nes-info">
                        <h2>How do I play?</h2>
                        Just drag and drop a .nes file of the game you want to play into the upload zone.
                        The keyboard is bound to NES inputs as follows: The NES D-pad is bound to WASD, Start and Select are
                        bound to T and Y respectively, B is bound to Shift, and A is bound to Space.
                        <h2>How does it work?</h2>
                        The core of the GC NES Emulator is implemented in the Rust programming language, which supports Web
                        Assembly as a compilation target. With a WASM version of the emulator, I've written a javascript wrapper
                        that takes the frame rendered with the Rust code and displays it on an HTML 5 canvas. At present, this
                        is done completely synchronously, though I would like to move it into a worker at some point in the future
                        (I may have done this already and forgotten to remove this message).
                        <h2>Which games can I play?</h2>
                        The GC NES Emulator is currently only capable of running a subset of the NES' full game catalogue.
                        This is because each NES cartridge could contain custom circuitry known as the Mapper, with each mapper
                        needing to be implemented separately. At present, iNES mappers 000 through 003 are fully supported,
                        along with a semi-functional implementation of Mapper 004 (Super Mario Bros. 3 works perfectly).
                        These five mappers cover just under 2000 of the games in the NES catalogue. If you'd like to expand
                        the list of supported games, feel free to <a href="https://github.com/GarettCooper/gc_nes_emulator/compare">open a Pull Request</a> with new Mapper implementations.
                        <h2>Why can't I hear anything?</h2>
                        The short answer is "I don't know anything about audio". The slightly long answer is "I don't know
                        enough about audio to determine how much work it would be to implement NES audio output, and then convert that
                        into a format compatible with the Web Audio API. It may not be that much, but I decided to label my silent
                        NES emulator as good enough for the time being". If you know how to do this and find yourself frustrated
                        by my ignorance, feel free to implement it yourself and <a href="https://github.com/GarettCooper/gc_nes_emulator/compare">open a Pull Request</a>.
                        <h2>Why are there graphical glitches?</h2>
                        While the GC NES emulator is far from flawless, a surprising number of the graphical glitches that
                        you see are present in the original NES games. For example, the random colours that you see on the
                        right side of the Super Mario Bros. 3 screen while moving is completely faithful to the original version
                        of the game. The emulator does have a known issue where the top row of pixels sometimes contains a
                        few strays which aren't present in other emulators.
                        <h2>Why does it (sometimes) look out of focus?</h2>
                        This is because the image is being scaled up from the NES' native 256x240 resolution by your browser's
                        HTML 5 Canvas renderer, which is attempting to smooth the hard lines between pixels. I've tried to
                        configure it to use pixel perfect scaling but it does not seem to be compatible with all browsers.
                        If you know how to fix this, feel free to reach out to me at <a href="mailto:garett@garettcooper.com">garett@garettcooper.com</a>.
                        For guaranteed pixel-perfect scaling, you can download a version of the emulator natively compiled for
                        your whichever platform you choose on <a href="https://github.com/GarettCooper/gc_nes_emulator">my GitHub</a>.
                    </div>
                </div>)
        } else {
            return (
                <div>
                    <h1>The GC NES Emulator</h1>
                    Sorry, the GC NES Emulator currently requires browser support for <a href="https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas">OffscreenCanvas</a> in
                    order to provide player scaling functionality. Try opening this link in a different browser.
                </div>
            )
        }
    }

    private setScaling(scaling: number) {
        this.nesScaling = scaling;
        this.setState({nesScaling: scaling});
        let mainCanvasContext = this.nesCanvas?.current?.getContext("2d");
        mainCanvasContext?.resetTransform();
        mainCanvasContext?.scale(this.nesScaling, this.nesScaling);
    }

    controlInput: number;
    private keyDownHandler(e: KeyboardEvent) {
        if (this.state.romLoaded) {
            const keyOffset = this.keyOffset(e.key);
            if (keyOffset !== -1) {
                this.controlInput |= 1 << keyOffset;
            }
            e.preventDefault();
        }
    }

    private keyUpHandler(e: KeyboardEvent) {
        if (this.state.romLoaded) {
            const keyOffset = this.keyOffset(e.key);
            if (keyOffset !== -1) {
                this.controlInput &= ~(1 << keyOffset);
            }
            e.preventDefault();
        }
    }

    private keyOffset(key: string) {
        switch (key) {
            // A
            case " ":
                return 0;
            // B
            case "Shift":
                return 1;
            // Select
            case "y":
            case "Y":
                return 2;
            // Start
            case "t":
            case "T":
                return 3;
            // Up
            case "w":
            case "W":
                return 4;
            // Down
            case "s":
            case "S":
                return 5;
            // Left
            case "a":
            case "A":
                return 6;
            // Right
            case "d":
            case "D":
                return 7;
        }
        return -1;
    }
}