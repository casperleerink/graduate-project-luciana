function Intro2() {
    this.scale = 0.1;
    this.setup = () => {
        console.log("Intro 2!");
        
        ramp(0.1, 1.0, 6000, 10, (count) => {
            //on  instance
            this.scale = count;
            // console.log(curr);
            
        }, (count) => {
            this.scale = count;
            this.sceneManager.showScene(Phase123);
        });
    }
    this.draw = () => {
        background(0);
        // console.log("intro2 is drawing");
        
        this.sceneManager.mainGrid.update(
            this.scale, //main scale
            1/3, //middle rect scaling
            1/3, //outer rects scaling
            1/3, //gap (deviation from centre for outer rects)
        );
        this.sceneManager.mainGrid.appearance();
        drawSprite(this.sceneManager.mainGrid.s);
    }
}