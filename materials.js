
//outer rectangles
class Rect {
    constructor(id, gap, x, y, w, h, opacity=255, infected=0, empty=false, strokeWeight=0.5) {
        this.id = id;
        this.gap = gap;
        this.x = x;//rect center xpos
        if (this.id == 0 || this.id == 6 || this.id == 7) {
            this.x = x + this.gap;
        }
        if (this.id == 2 || this.id == 3 || this.id == 4) {
            this.x = x - this.gap;
        }
        this.y = y; //rect center ypos
        if (this.id == 4 || this.id == 5 || this.id == 6) {
            this.y = y + this.gap * (9/16);
        }
        if (this.id == 0 || this.id == 1 || this.id == 2) {
            this.y = y - this.gap * (9/16);
        }
        this.w = w;
        this.h = h;
        this.opacity = opacity;
        this.infected = infected;
        this.empty=empty;
        this.strokeWeight = strokeWeight;
    }
    display() {
        push();
        const c = getColor(this.id);
        if (this.infected > 0) {
            c.setAlpha(this.opacity);
            fill(c);
            noStroke();
            rect(this.x, this.y, this.w, this.h);
            tint(255, this.infected);
            image(staticImg, this.x, this.y, this.w, this.h);
        } else if (this.empty) {
            noFill();
            strokeWeight(this.strokeWeight);
            stroke(255);
            rect(this.x, this.y, this.w, this.h);
        } else {
            c.setAlpha(this.opacity);
            fill(c);
            noStroke();
            rect(this.x, this.y, this.w, this.h);
        }
        pop();
    }
}



//inner rectangle
class MiddleRect {
    constructor(x, y, w, h, img, opacity=255, colorId=-1) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.opacity = opacity
        this.colorId=colorId;
    }
    display() {
        push();
        if (this.opacity != 255) {
            tint(255, this.opacity)
        }
        if (this.colorId > -1) {
            const c = getColor(this.colorId);
            c.setAlpha(this.opacity);
            fill(c);
            rect(this.x, this.y, this.w, this.h)
        } else {
            image(this.img, this.x, this.y, this.w, this.h);
        }
        pop();
    }
}


class MainGrid {
    constructor(img) {
        this.x = width/2;
        this.y = height/2;
        this.mainScale = 1.0; //overall scaling of the grid
        this.w = width * this.mainScale;
        this.h = height * this.mainScale;
        this.outerRectScale = 1/3; //scaling of individual rectangles (normal = 0.33)
        this.innerRectScale = 1/3;
        this.gap = 1/3; //deviation from centre, amount relative to main grid width
        this.s = createSprite(this.x, this.y, this.w, this.h);
        this.s.immovable = true;
        this.static = img;
        this.innerOpacity = 255;
        this.outerOpacity = 255;
        this.infected = 0;
        this.outerRectsEmpty = [false, false, false, false, false, false, false, false];
        this.middleRectColor = -1;
        this.outerRectStrokeWeight = 0.5;
        this.currentVideoRect = 8;
    }
    update(
        mainScale, gap, innerOpacity, outerOpacity, infected=0, middleRectColor=-1) {
        //runs every draw
        //update main scaling if necessary
        if (mainScale != this.mainScale) {
            this.mainScale = mainScale;
            this.w = width * this.mainScale;
            this.h = height * this.mainScale;
            this.s.width = this.w;
            this.s.height = this.h;
        }

        this.gap = gap;
        this.innerOpacity = innerOpacity;
        this.outerOpacity = outerOpacity;
        this.infected = infected;
        this.middleRectColor = middleRectColor;
        this.s.setCollider("rectangle", 0, 0, this.s.width, this.s.height);
    }
    updateRectEmpty(i, b) {
        this.outerRectsEmpty[i] = b;
    }
    allRectsEmpty(v) {
        this.outerRectsEmpty = [v, v, v, v, v, v, v, v];
    }
    updateStrokeWeight(v) {
        this.outerRectStrokeWeight = v;
    }
    updateVideoRect(num) {
        this.currentVideoRect = num;
    }
    appearance() {
        this.s.draw = () => {
            for (let i = 0; i < 8; i++) {
                let r;
                if (this.currentVideoRect === 8) {
                    r = new Rect(
                        i, //index
                        this.gap * this.w, //gap (position deviation from center)
                        0, //x
                        0, //y
                        this.w * this.outerRectScale, //width relative to main grid rect
                        this.h * this.outerRectScale, //height relative to main grid rect
                        this.outerOpacity, //sets opacity for outer rectangles
                        this.infected, //sets static image 'infecting' the outer rectangles
                        this.outerRectsEmpty[i], //no color in these rectangles
                        this.outerRectStrokeWeight, //the svisibility of the stroke after color has left
                    );
                } else {
                    r = new Rect(
                        i, //index
                        this.gap * this.w, //gap (position deviation from center)
                        0, //x
                        0, //y
                        this.w * this.outerRectScale, //width relative to main grid rect
                        this.h * this.outerRectScale, //height relative to main grid rect
                        i === this.currentVideoRect ? this.outerOpacity : 255, //sets opacity for outer rectangles
                        this.infected, //sets static image 'infecting' the outer rectangles
                        this.outerRectsEmpty[i], //no color in these rectangles
                        this.outerRectStrokeWeight, //the svisibility of the stroke after color has left
                    );
                }
                r.display();
            }
            const middleRect = new MiddleRect(
                0, 
                0, 
                this.w * this.innerRectScale,
                this.h * this.innerRectScale,
                this.static,
                this.innerOpacity,
                this.middleRectColor,
            );
            middleRect.display();
        }
        // this.s.debug = true;
    }
}

//simple version of main grid for intro only
class IntroGrid {
    constructor(x, y, scale, group, vel, middleImg) {
        this.s = createSprite(x, y, width * scale, height * scale);
        this.s.velocity.x = vel.x;
        this.s.velocity.y = vel.y;
        this.s.setCollider("rectangle", 0, 0, this.s.width, this.s.height);
        group.add(this.s);
        this.static = middleImg;
        this.appearance();
    }

    appearance() {
        this.s.draw = () => {
            for (let i = 0; i < 8; i++) {
                const r = new Rect(
                    i, //index
                    1/3 * this.s.width, //gap (position deviation from center)
                    0, //x
                    0, //y
                    this.s.width * 1/3, //width relative to main grid rect
                    this.s.height * 1/3, //height relative to main grid rect
                );
                r.display();
            }
            const middleRect = new MiddleRect(
                0, //x
                0, //y
                this.s.width * 1/3, //width relative to main grid rect
                this.s.height * 1/3, //height relative to main grid rect
                this.static, //image of static noise
            );
            middleRect.display();
        }
        // this.s.debug = true;
    }
}



class Video {
    constructor(id) {
        this.div = createDiv();
        this.div.id('player')
        this.div.hide();
        this.iframe = new Vimeo.Player('player', {
            id: id,
            width: windowWidth,
            controls: "false",
        });
    }
    setSize(w) {
        this.div.size(w, w * (720/1280));
        // setTimeout(() => {
        //     console.log(this.div.elt.firstChild);
        //     // this.div.elt.firstChild.width = 200;
        // }, 1000)
    }
    setPosition(x, y) {
        this.div.position(x - this.div.width/2 + xToCenter, y - this.div.height/2 + yToCenter)
    }
    setCuePoint(t, section) {
        this.iframe.addCuePoint(t, section);
    }
    show() {
        this.div.show();
    }
}