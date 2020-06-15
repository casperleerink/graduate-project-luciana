function End() {
    this.image;
    this.setup = () => {
        this.image = loadImage('assets/images/thank-you.png');
        setTimeout(() => {
            this.image = loadImage('assets/images/collaborators-thanks.png');
        }, 2000);
        setTimeout(() => {
            this.image = undefined;
        }, 4000);

    }

    this.draw = () => {
        clear();
        if (this.image) {
            image(this.image, width*0.5, height*0.5, width, height);
        } else {
            fill(255);
            textAlign(CENTER);
            textSize(30)
            text("In a couple of minutes, please join me for a post-show social on Zoom!", width *0.5, height * 0.3, width * 0.8, height*0.3);
        }
    }
}