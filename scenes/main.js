function Main() {
    this.showMainGrid = true;
    this.scale = 1;
    this.innerOpacity = 255;
    this.outerOpacity = 255;
    this.video = new Video("431146770");
    this.buttons = [];
    this.sections = [
        "Begin",
        "Phase1",
        "Transition1",
        "Phase2",
        "Transition2",
        "Phase3",
        "Transition3",
        "Static1",
        "Static2",
        "Static3",
        "Intersession",
        "Silence",
        "Gilda",
        "Final",
    ];
    this.sectionTimes = [
        0, //begin
        8, //p1
        convertTime(3, 46),
        convertTime(4, 4), //p2
        convertTime(14, 28),
        convertTime(14, 44), //p3
        convertTime(20, 25),
        convertTime(20, 40), //static
        convertTime(20, 48),
        convertTime(20, 56),
        convertTime(21, 4), //intersession
        convertTime(21, 40), //silence
        convertTime(22, 4), //gilda
        convertTime(34, 10), //final
    ];

    //Initial setup
    this.setup = () => {
        this.video.iframe.play();
        this.video.iframe.on('play', () => {
            this.video.show(); 
            setVideoSizeAndPosition(this.video, width, width * 0.5, height * 0.5);
            ramp(0.33333, 1.0, 5000, deltaTime, (current) => {
                const opacity = map(current, 0.33333, 1.0, 255, 0);
                this.sceneManager.mainGrid.update(this.scale, current, opacity, this.outerOpacity);
            }, () => {
                this.showMainGrid = false;
            });
        })
        // this.video.iframe.on('cuepoint', ({data}) => {
        //     this.video.show();
        //     if (data === "Begin") {
        //         setVideoSizeAndPosition(this.video, width/3, width * 0.5, height * 0.5);
        //         this.outerOpacity = 255;
        //         this.innerOpacity = 255;
        //         this.sceneManager.mainGrid.innerRectScale = 1/3;
        //         this.sceneManager.mainGrid.allRectsEmpty(false);
        //         ramp(255, 0, 7900, 100, (c) => {
        //             this.sceneManager.mainGrid.update(this.scale, 1/3, c, this.outerOpacity);
        //         });
        //     }
        //     if (data === "Phase1") {
        //         setVideoSizeAndPosition(this.video, width/3, width * 5/6, height * 1/6);
        //         this.sceneManager.mainGrid.allRectsEmpty(false);
        //         this.outerOpacity = 180;
        //         this.innerOpacity = 255;
        //         this.sceneManager.mainGrid.innerRectScale = 1/3;
        //         this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity);
        //         this.sceneManager.mainGrid.updateVideoRect(0);
        //     }
        //     if (data === "Transition1" || data === "Transition2" || data === "Transition3") {
        //         setVideoSizeAndPosition(this.video, width/3, width * 0.5, height * 0.5);
        //         this.sceneManager.mainGrid.allRectsEmpty(false);
        //         this.outerOpacity = 255;
        //         this.innerOpacity = 0;
        //         this.sceneManager.mainGrid.innerRectScale = 1/3;
        //         this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity);
        //         this.sceneManager.mainGrid.updateVideoRect(8);
        //     }
        //     if (data === "Phase2") {
        //         setVideoSizeAndPosition(this.video, width/3, width * 5/6, height * 1/6);
        //         this.sceneManager.mainGrid.allRectsEmpty(false);
        //         this.outerOpacity = 100;
        //         this.innerOpacity = 255;
        //         this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity);
        //         this.sceneManager.mainGrid.updateVideoRect(0);
        //     }
        //     if (data === "Phase3") {
        //         setVideoSizeAndPosition(this.video, width/3, width * 5/6, height * 1/6);
        //         this.sceneManager.mainGrid.allRectsEmpty(false);
        //         this.outerOpacity = 60;
        //         this.innerOpacity = 255;
        //         this.sceneManager.mainGrid.innerRectScale = 1/3;
        //         this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity);
        //         this.sceneManager.mainGrid.updateVideoRect(0);
        //     }
        //     if (data === "Static1") {
        //         setVideoSizeAndPosition(this.video, width/3, width * 0.5, height * 0.5);
        //         this.sceneManager.mainGrid.allRectsEmpty(false);
        //         this.outerOpacity = 255;
        //         this.sceneManager.mainGrid.innerRectScale = 1/3;
        //         this.sceneManager.mainGrid.update(this.scale, 1/3, 127, this.outerOpacity);
        //         // ramp(0, 127, 7900, 100, (c) => {
        //         //     this.sceneManager.mainGrid.update(this.scale, 1/3, c, this.outerOpacity);
        //         // });
        //         this.sceneManager.mainGrid.updateVideoRect(8);
        //     }
        //     if (data === "Static2") {
        //         setVideoSizeAndPosition(this.video, width/3, width * 0.5, height * 0.5);
        //         this.sceneManager.mainGrid.allRectsEmpty(false);
        //         this.outerOpacity = 255;
        //         this.innerOpacity = 127;
        //         this.sceneManager.mainGrid.innerRectScale = 1/3;
        //         this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity, 127);
        //         // ramp(0, 127, 7900, 100, (c) => {
        //         //     this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity, c);
        //         // });
        //         this.sceneManager.mainGrid.updateVideoRect(8);
        //     }
        //     if (data === "Static3") {
        //         setVideoSizeAndPosition(this.video, width, width * 0.5, height * 0.5);
        //         this.sceneManager.mainGrid.allRectsEmpty(false);
        //         this.innerOpacity = 127;
        //         this.sceneManager.mainGrid.innerRectScale = 1/3;
        //         this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, 127, 127);
        //         // ramp(255, 127, 1000, deltaTime, (c) => {
        //         //     this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, c, 127);
        //         // });
        //         this.sceneManager.mainGrid.updateVideoRect(8);
        //     }
        //     if (data === "Intersession") {
        //         setVideoSizeAndPosition(this.video, width, width * 0.5, height * 0.5);
        //         this.innerOpacity = 127;
        //         this.outerOpacity = 127;
        //         this.sceneManager.mainGrid.updateVideoRect(8);
        //         this.sceneManager.mainGrid.allRectsEmpty(false);
        //         this.sceneManager.mainGrid.updateStrokeWeight(0.5);
        //         this.sceneManager.mainGrid.innerRectScale = 1/3;
        //         this.sceneManager.mainGrid.update(this.scale, 1/3, this.innerOpacity, this.outerOpacity, 0);
        //         //set colors to move to middle rect one by one
        //         const interval = 1500;
        //         let i = -1;
        //         const timer = setInterval(() => {
        //             i++;
        //             if (i > 7) {
        //                 clearInterval(timer);
        //                 ramp(127, 0, 7500, 33, (c) => {
        //                     this.sceneManager.mainGrid.update(this.scale, 1/3, c, this.outerOpacity, 0, -1);
        //                 });
        //             } else {
        //                 this.sceneManager.mainGrid.updateRectEmpty(i, true);
        //                 this.sceneManager.mainGrid.middleRectColor = i;
        //                 setTimeout(() => { this.sceneManager.mainGrid.middleRectColor = -1}, interval*0.5);
        //             }
        //         }, interval);
        //         intervals.push(timer);
        //     }
        //     if (data === "Silence") {
        //         setVideoSizeAndPosition(this.video, width, width * 0.5, height * 0.5);
        //         this.sceneManager.mainGrid.update(this.scale, 1/3, 0, 0);
        //         this.sceneManager.mainGrid.updateStrokeWeight(0.5);
        //         this.sceneManager.mainGrid.allRectsEmpty(true);
        //         this.sceneManager.mainGrid.innerRectScale = 1/3;
        //     }
        //     if (data === "Gilda") {
        //         setVideoSizeAndPosition(this.video, width, width * 0.5, height * 0.5);
        //         this.sceneManager.mainGrid.update(this.scale, 1/3, 0, 0);
        //         this.sceneManager.mainGrid.allRectsEmpty(true);
        //         this.sceneManager.mainGrid.innerRectScale = 1/3;
        //         ramp(0.5, 0, 4000, 100, (c) => {
        //             this.sceneManager.mainGrid.updateStrokeWeight(c);
        //         });
        //     }
        //     if (data === "Final") {
        //         setVideoSizeAndPosition(this.video, width, width * 0.5, height * 0.5);
        //         this.sceneManager.mainGrid.update(this.scale, 1/3, 127, 0);
        //         this.sceneManager.mainGrid.allRectsEmpty(true);
        //         this.sceneManager.mainGrid.updateStrokeWeight(0);
                
        //         this.sceneManager.mainGrid.innerRectScale = 1;
        //         this.innerOpacity = 127;
        //         let i = 0;
        //         this.sceneManager.mainGrid.middleRectColor = i;
        //         const timer = setInterval(() => {
        //             i++;
        //             if (i > 7) {
        //                 clearInterval(timer);
        //                 this.sceneManager.mainGrid.update(this.scale, 1/3, 255, 0);
        //                 this.sceneManager.mainGrid.middleRectColor = -1;
        //             } else {
        //                 this.sceneManager.mainGrid.update(this.scale, 1/3, 127, 0);
        //                 this.sceneManager.mainGrid.middleRectColor = i;
        //             }
        //         }, 1750);
        //         intervals.push(timer);
        //     }


        //     //video placement
        //     if (data === 1) {
        //         setVideoSizeAndPosition(this.video, width/3, width * 5/6, height * 1/6);
        //         this.sceneManager.mainGrid.updateVideoRect(0);
        //     }
        //     if (data === 2) {
        //         setVideoSizeAndPosition(this.video, width/3, width * 3/6, height * 1/6);
        //         this.sceneManager.mainGrid.updateVideoRect(1);
        //     }
        //     if (data === 3) {
        //         setVideoSizeAndPosition(this.video, width/3, width * 1/6, height * 1/6);
        //         this.sceneManager.mainGrid.updateVideoRect(2);
        //     }
        //     if (data === 4) {
        //         setVideoSizeAndPosition(this.video, width/3, width * 1/6, height * 3/6);
        //         this.sceneManager.mainGrid.updateVideoRect(3);
        //     }
        //     if (data === 5) {
        //         setVideoSizeAndPosition(this.video, width/3, width * 1/6, height * 5/6);
        //         this.sceneManager.mainGrid.updateVideoRect(4);
        //     }
        //     if (data === 6) {
        //         setVideoSizeAndPosition(this.video, width/3, width * 3/6, height * 5/6);
        //         this.sceneManager.mainGrid.updateVideoRect(5);
        //     }
        //     if (data === 7) {
        //         setVideoSizeAndPosition(this.video, width/3, width * 5/6, height * 5/6);
        //         this.sceneManager.mainGrid.updateVideoRect(6);
        //     }
        //     if (data === 8) {
        //         setVideoSizeAndPosition(this.video, width/3, width * 5/6, height * 3/6);
        //         this.sceneManager.mainGrid.updateVideoRect(7);
        //     }
        //     console.log(data);    
        // }); //end of on cuepoint function
        
        this.video.iframe.on('ended', () => {
            this.showMainGrid = true;
            this.sceneManager.mainGrid.innerRectScale = 1;
            this.sceneManager.mainGrid.update(this.scale, 1/3, 255, 0);
            this.video.div.hide();
            this.video.iframe.off('play');
            this.video.iframe.off('ended');

            //new video
            this.video.iframe.loadVideo("431146656");
            this.video.iframe.on('play', () => {
                this.video.div.show();
            });
            this.video.iframe.on('ended', () => {
                this.video.div.hide();
                window.location.href = '/ending.html';
            });
            setTimeout(() => {
                this.sceneManager.mainGrid.update(this.scale, 1/3, 0, 0);
            }, 2000);
            setTimeout(() => {
                this.video.iframe.play();
            }, 4000);
        });


        //Sections! cuepoints
        this.sections.forEach((s, i) => {
            // this.video.setCuePoint(this.sectionTimes[i], s);

            //Create buttons for test playback control..
            const b = createButton(s);
            // b.position(10, height * (i/this.sections.length));
            b.mousePressed(() => {
                intervals.forEach(clearInterval);
                this.video.iframe.setCurrentTime(this.sectionTimes[i]);
                this.video.iframe.play();
            });
            this.buttons.push(b);
        });
        // setCuePoints(this.video);
        this.video.iframe.play(); //Start the video!
    }

    this.draw = () => {
        clear();
        if (this.showMainGrid) {
            this.sceneManager.mainGrid.appearance();
            drawSprite(this.sceneManager.mainGrid.s);      
        }    
    }
}

function setCuePoints(video) {
    video.setCuePoint(10, 2);
    video.setCuePoint(20, 3);
    video.setCuePoint(22, 4);
    video.setCuePoint(24, 5);
    video.setCuePoint(26, 6);
    video.setCuePoint(28, 7);
    video.setCuePoint(30, 8);
}

function setVideoSizeAndPosition(video, size, x, y) {
    video.setSize(size);
    video.setPosition(x, y);
}