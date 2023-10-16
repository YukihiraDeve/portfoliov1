import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import python from '../assets/Python.jpg';
import LangageC from '../assets/LangageC.jpg';
import js from '../assets/JS.jpg';
import html from '../assets/html.jpg';
import php from '../assets/php.jpg';

const VIRTUAL_WIDTH = 1920;
const VIRTUAL_HEIGHT = 1080;

const bullePositions = [

    { x: 960, y: 540, size: 220, image: js }, 
    { x: 900, y: 550, size: 220, image: js }, 
    // { x: 0.5, y: 0.5, size: 220, image: js },//Centre
    // { x: 0.6, y: 0.35, size: 120, image: LangageC },
    // { x: 0.39, y: 0.35, size: 160, image: python },
    // { x: 0.60, y: 0.72, size: 200, image: js },
    // { x: 0.68, y: 0.53, size: 150, image: html },
    // { x: 0.49, y: 0.72, size: 100, image: php }


];
var check = 0;

const Bulles = () => {
    const myP5 = useRef();
    const images = {};

    useEffect(() => {
        new p5(sketch, myP5.current);
    }, []);

    const sketch = (p) => {
        let scaleFactor;

        let bulles = [];

        p.preload = () => {
            for (let position of bullePositions) {
                if (position.image) {
                    images[position.image] = p.loadImage(position.image);
                }
            }
        };

        p.setup = () => {
            if (check == 0){
                check = 1;
                p.createCanvas(p.windowWidth, p.windowHeight);
                scaleFactor = p.windowWidth / VIRTUAL_WIDTH;
                p.imageMode(p.CENTER);
                initializeBulles(); 
        
            }


        };


        const initializeBulles = () => {
            bulles = []; // Réinitialiser le tableau des bulles
            for (let position of bullePositions) {
                const x = position.x * scaleFactor;
                const y = position.y * scaleFactor;
                let img = position.image ? images[position.image] : null;
                bulles.push(new Bulle(p, x, y, position.size * scaleFactor, img));
            }
        }


        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            scaleFactor = p.windowWidth / VIRTUAL_WIDTH;  // Mettre à jour le facteur d'échelle
            initializeBulles(); // Réinitialiser les bulles lors du redimensionnement
        };

        p.draw = () => {
            p.background('#292929');

            // Set shadow for all bubbles here
            p.drawingContext.shadowOffsetX = 0;
            p.drawingContext.shadowOffsetY = 5;
            p.drawingContext.shadowBlur = 15;
            p.drawingContext.shadowColor = '#1D1D1D';

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
            constructor(p, x, y, size, img) {
                this.p = p;
                this.x = x;
                this.y = y;
                this.size = size;
                this.img = img;
                this.xSpeed = 0;
                this.ySpeed = 0;
                this.lastMoved = p.millis();
                this.initialPos = { x: x, y: y };

                if (this.img) {
                    this.maskImg = p.createGraphics(this.size, this.size);
                    this.maskImg.fill(255);
                    this.maskImg.noStroke();
                    this.maskImg.ellipse(this.maskImg.width / 2, this.maskImg.height / 2, this.size);
                    this.maskedImage = this.img.get(); // Create a copy of the image
                    this.maskedImage.mask(this.maskImg); // Mask the image once
                }
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
                    this.x += (this.initialPos.x - this.x) * 0.09;
                    this.y += (this.initialPos.y - this.y) * 0.09;
                }

            }

            

            display() {
                p.fill(255);
                p.noStroke();
                p.ellipse(this.x, this.y, this.size);

                if (this.maskedImage) {
                    p.image(this.maskedImage, this.x, this.y, this.size, this.size); // Draw masked image directly
                }
            
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
