import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import python from '../assets/Python.jpg';
import LangageC from '../assets/LangageC.jpg';
import js from '../assets/JS.jpg';
import html from '../assets/html.jpg';
import php from '../assets/php.jpg';
import Android from '../assets/Android.jpg'
import csharp from "../assets/csharp.jpg"
import java from "../assets/Java.jpg"
import node from "../assets/node.jpg"
import figma from "../assets/figma.jpg"
import photoshop from "../assets/photoshop.jpg"
import solidity from "../assets/solidity.jpg"
import swift from "../assets/swift.jpg"

const VIRTUAL_WIDTH = 1920;
const VIRTUAL_HEIGHT = 1080;

const bullePositions = [

    { x: 960, y: 540, size: 220, image: html }, //centre
    { x: 281, y: 258, size: 150, image: node },
    { x: 320, y: 619, size: 158, image: Android},
    { x: 572, y: 270, size: 70, image: LangageC },
    { x: 517, y: 361, size: 250, image: js },
    { x: 669, y: 129, size: 177, image: java },
    { x: 850, y: 440, size: 110, image: php },
    { x: 779, y: 598, size: 236, image: python },
    { x: 1125, y: 264, size: 85, image: csharp },
    { x: 1100, y: 250, size: 110, image: swift },
    { x: 1200, y: 700, size: 150, image: photoshop },
    { x: 350, y: 450, size: 120, image: solidity }





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
