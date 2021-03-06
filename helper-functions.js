let fs;
function fullscr() {
    fs = fullscreen();
    fullscreen(!fs);
}

function getColor(num) {
    switch (num) {
        case 0:
            return color(255, 255, 0);
        case 1:
            return color(230, 0, 255);
        case 2:
            return color(245, 127, 0);
        case 3:
            return color(245, 106, 163);
        case 4:
            return color(65, 165, 156);
        case 5:
            return color(137, 165, 47); 
        case 6:
            return color(35, 129, 237);
        case 7:
            return color(255, 47, 47);
        default:
            return color(255, 255, 255);
    }
}


const intervals = [];
function ramp(start, end, duration, interval, onInstance, onComplete) {
    const startTime = millis();
    const setInt = setInterval(() => {
        const cTime = millis() - startTime;
        if (cTime > duration) {
            clearInterval(setInt);
            typeof onComplete === 'function' && onComplete(end);
        } else {
            typeof onInstance === 'function' && onInstance(map(cTime, 0, duration, start, end));
        }
    }, interval);
    intervals.push(setInt);
}

function bounceEdges(g) {
    //all sprites bounce at the screen side edges (only x needed)
    for(let i=0; i<g.length; i++) {
        const s = g.get(i);
        if(s.position.x<0) {
            s.position.x = 1;
            s.velocity.x = abs(s.velocity.x);
        }
        if(s.position.x>width) {
            s.position.x = width-1;
            s.velocity.x = -abs(s.velocity.x);
        }
        if(s.position.y<0) {
            s.position.y = 1;
            s.velocity.y = abs(s.velocity.y);
        }
        if(s.position.y>height) {
            s.position.y = height-1;
            s.velocity.y = -abs(s.velocity.y);
        }
    }
}


function convertTime(min, sec) {
    return min * 60 + sec;
}