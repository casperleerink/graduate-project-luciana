function Phase123() {
    this.scale = 1/3;
    this.setup = () => {
        console.log("Phase 1!");

        //
        // ramp(0, width, 6000, 10, (curr) => {
        // }, (curr) => {
        //     this.sceneManager.video.pause();
        //     // this.sceneManager.showScene(Phase2);
        // });
    }
    this.draw = () => {
        clear();
        // background(0, 16);
        // background(this.sceneManager.backgroundColor);
        this.sceneManager.mainGrid.update(
            1.0, //main scale
            this.scale, //middle rect scaling
            this.scale, //outer rects scaling
            1/3, //gap (deviation from centre for outer rects)
            255, //inner grid(static) opacity
            127, //outer grids opacity
        );
        this.sceneManager.mainGrid.appearance();
        drawSprite(this.sceneManager.mainGrid.s);
    }
}