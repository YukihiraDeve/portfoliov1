import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const bullePositions = [
    { x: 600, y: 540, size: 420 }, // Bulle centrale la plus grande
    { x: 450, y: 400, size: 260 }, // Bulle à gauche de la bulle centrale
    { x: 800, y: 400, size: 210 }, // Bulle à droite de la bulle centrale
    { x: 360, y: 230, size: 140 }, // Bulle en haut à gauche
    { x: 960, y: 230, size: 140 }, // Bulle en haut à droite
    { x: 240, y: 620, size: 140 }, // Bulle en bas à gauche
    { x: 1080, y: 620, size: 140 }, // Bulle en bas à droite
    { x: 760, y: 250, size: 80 },  // Petite bulle juste au-dessus de la bulle centrale
    { x: 670, y: 290, size: 60 }
];

const Bulles = () => {
    const myP5 = useRef();

    useEffect(() => {
        new p5(sketch, myP5.current);
    }, []);

    const sketch = (p) => {
        let bulles = [];

        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight);
            for (let position of bullePositions) {
                bulles.push(new Bulle(p, position.x, position.y, position.size));
            }
        };

        p.draw = () => {
            p.background(0);
            handleCollisions();
            displayBulles();
        };

        const handleCollisions = () => {
            for (let i = 0; i < bulles.length; i++) {
                for (let j = i + 1; j < bulles.length; j++) {
                    bulles[i].checkCollision(bulles[j]);
                }
            }
        };

        const displayBulles = () => {
            for (let bulle of bulles) {
                bulle.move();
                bulle.display();
            }
        };

        class Bulle {
            constructor(p, x, y, size) {
                this.p = p;
                this.x = x;
                this.y = y;
                this.size = size;
                this.xSpeed = 0;
                this.ySpeed = 0;
                this.lastMoved = p.millis();
                this.initialPos = { x: x, y: y };
            }

            move() {
                const distanceToMouse = this.p.dist(this.p.mouseX, this.p.mouseY, this.x, this.y);
                
                if (distanceToMouse < this.size / 2) {
                    this.ax = (this.x - this.p.mouseX) * 0.05;
                    this.ay = (this.y - this.p.mouseY) * 0.05;
                    this.lastMoved = this.p.millis();
                }

                if (distanceToMouse < 150) {
                    let dx = this.x - this.p.mouseX;
                    let dy = this.y - this.p.mouseY;
                    let mag = this.p.sqrt(dx * dx + dy * dy);
                    dx /= mag;
                    dy /= mag;
                    this.xSpeed = dx * 2;
                    this.ySpeed = dy * 2;
                } else {
                    this.xSpeed *= 0.9;
                    this.ySpeed *= 0.9;
                }

                this.x += this.xSpeed;
                this.y += this.ySpeed;

                if (this.p.millis() - this.lastMoved > 3000) {
                    this.x += (this.initialPos.x - this.x) * 0.05;
                    this.y += (this.initialPos.y - this.y) * 0.05;
                }
            }

            display() {
                this.p.fill(255);
                this.p.noStroke();
                this.p.ellipse(this.x, this.y, this.size);
            }

            checkCollision(other) {
                const distance = this.p.dist(this.x, this.y, other.x, other.y);
                const minDistance = (this.size / 2) + (other.size / 2);

                if (distance < minDistance) {
                    let dx = other.x - this.x;
                    let dy = other.y - this.y;
                    let mag = this.p.sqrt(dx * dx + dy * dy);
                    dx /= mag;
                    dy /= mag;
                    const overlap = minDistance - distance;
                    this.x -= dx * (overlap / 2);
                    this.y -= dy * (overlap / 2);
                    other.x += dx * (overlap / 2);
                    other.y += dy * (overlap / 2);
                }
            }
        }
    };

}

export default Bulles;
