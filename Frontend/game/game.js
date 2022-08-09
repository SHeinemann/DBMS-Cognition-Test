import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, StatusBar, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import {Finger} from "./renderers";
import {MoveFinger} from "./systems"

// parts of the game.js, renderer.js and systems.js files are taken from the official library
// github page. This mainly concerns the structure of the game, not the functionality.
// Source: https://github.com/bberak/react-native-game-engine

const RADIUS = 20; // circle radius in px
export default class BestGameEver extends PureComponent {
  constructor() {
    super();

    ////////////////////////////////////////////////////////////////////////////////////
    // Below is the code for spawning 15-25 random points inside of the playing field //
    ////////////////////////////////////////////////////////////////////////////////////
    
    const PADDING = 20
    const WIDTH = Dimensions.get("window").width * 0.9 - 2*PADDING;  
    const HEIGHT = Dimensions.get("window").height * 0.7 - 2*PADDING;  // subtracting 20 that the circles stay in the boundaries
    const MARGIN = 50;
    const NOOFCIRCLES = 15 + Math.floor(Math.random() * 10); // random number of circles between 15 and 25

    while (true){
      // this is in a while loop so that everything can be reset in case a point can't be spawned in 1000 tries.
      let columns = Math.round(WIDTH + 2*PADDING)   // the array will be bigger than the actual playing field by 2*pad
      let rows = Math.round(HEIGHT + 2*PADDING)
      let rowTemplate = Array(columns).fill(false)
      let matrix = Array.from(Array(rows), () => [...rowTemplate]); 
      let rowTemplate2 = Array(columns).fill(false) // unsure if this can be reused from above
      let pointsMatrix = Array.from(Array(rows), () => [...rowTemplate2]);
    
      let i = 0;
      let entities = {};
      let prevX;
      let prevY;
      let errorCount = 0;
      let success = false;
      
      while (i < NOOFCIRCLES){
        // if the errorCount gets too high start from scratch
        if (errorCount > 1000){
          break
        }
        // get random coordinates
        let x1 = PADDING + Math.floor(Math.random() * WIDTH);
        let y1 = PADDING + Math.floor(Math.random() * HEIGHT);
        
        // if the distance to any existing point is smaller than the margin
        // the new point will not be accepted
        let distanceCheck = false;
        for (let j = 0; j < i; j++){
          // checking l2 distance for each point
          let x2 = entities[j].position[0]
          let y2 = entities[j].position[1]

          let dist = Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
          if(dist < MARGIN){
            distanceCheck = true;
            break
          }
        }

        // checking if new point collides with existing lines or points
        let collisionEx = collisionCheckExisting(matrix, [x1,y1])
        // checking if the line from new point to previous point does not collide with existing point
        let collisionNew = collisionCheckNewLine(pointsMatrix, [x1, y1], [prevX, prevY])
        // if any collisions occur try again
        if (distanceCheck || collisionEx || collisionNew){
          errorCount++;
          continue
        } 
        
        // reset errorCount if a point was approved
        errorCount = 0;
        // add new point to entities
        let ent = { position: [x1,y1], 
                    id:i+1, 
                    color: "#b22222", 
                    touched: false,
                    renderer: <Finger /> }
        entities.new_key = i;
        entities[i] = ent;
        
        // mark the matrices with the point and line
        if (i > 0){
          drawLine(matrix, [x1, y1], [prevX, prevY])
        }
        drawPoint(matrix, pointsMatrix, [x1, y1])
        //update parameters
        i++;
        prevX = x1;
        prevY = y1;
        
        //finished 
        if(i == NOOFCIRCLES){
          success = true;
        }
      }
      //finished
      if (success){
        this.entities = entities;
        break;
      }
    }
  }

  render() {
    return (
      <GameEngine 
        style={styles.container} 
        systems={[MoveFinger]}
        entities={this.entities}> 
        <StatusBar hidden={true} />

      </GameEngine>
    );
  }
}

//following are the functions for the collision checks

const collisionCheckExisting = (matrix, [x,y]) => {
  // receiving a point and checking if its sitting on a line
  // ignoring the round nature of the circle and simply checking for square
  const MARGIN = RADIUS
  const WIDTH = Math.round(Dimensions.get("window").width * 0.9);  
  const HEIGHT = Math.round(Dimensions.get("window").height * 0.7);
  
  let xStart = x - MARGIN
  let yStart = y - MARGIN
  let xEnd = x + MARGIN
  let yEnd = y + MARGIN
  // check for edges of coordinate system
  if (xStart < 0){
    xStart = 0
  }
  if (xEnd > WIDTH){
    xEnd = WIDTH
  }
  if (yStart < 0){
    yStart = 0
  }
  if (yEnd > HEIGHT){
    yEnd = HEIGHT
  }

  let error = false
  // check for the coordinates of the given point if it collides with an existing 
  // point or line
  for (let i = xStart; i < xEnd; i++){
    for (let j = yStart; j < yEnd; j++){
      if (matrix[j][i]){
        error=true
      }
    }
  }
  return error;
}

const collisionCheckNewLine = (pointsMatrix, [x1, y1], [x2, y2]) => {
  // This collision check tests the line between the new point and the predecessor
  // If the line collides with any existing circles the coordinates need to be reset
  // Detailed comments on what is happening can be found in the "drawLine" function

  // need to stop before the line reaches this margin, otherwise 
  // the point x2y2 will be registered itself
  const MARGIN = RADIUS 

  let rx = x2 - x1
  let ry = y2 - y1
  let m = Math.abs(ry / rx)
  let dx;
  let dy;
  if (rx > 0){
    dx = 1 
  } else {
    dx = -1
  }
  if (ry > 0){
    dy = 1
  } else {
    dy = -1
  }
  let error = false;
  if (Math.abs(rx) > Math.abs(ry)){
    let y = y1;
    if (x1 < x2){
      for (let i = x1; i < x2 - MARGIN; i++){
        y += m * dy
        let j = Math.round(y)
        if (pointsMatrix[j][i]){
          error = true;
        }
      }
    } else{
      for (let i = x1; i > x2 + MARGIN; i--){
        y += m * dy
        let j = Math.round(y)
        if (pointsMatrix[j][i]){
          error = true;
        }
      }
    }
    
  } else{
    let x = x1;
    if (y1 < y2){
      for (let i = y1; i < y2 - MARGIN; i++){
        x += 1/m * dx
        let j = Math.round(x)
        if (pointsMatrix[i][j]){
          error = true;
        }
      }
    } else{
      for (let i = y1; i > y2 + MARGIN; i--){
        x += 1/m * dx
        let j = Math.round(x)
        if (pointsMatrix[i][j]){
          error = true;
        }
      }
    }
  }
  return error;
}

const drawLine = (matrix, [x1, y1], [x2, y2]) => {
  // marks all coordinates along the connection between p1 and p2 in the array as true
  let rx = x2 - x1
  let ry = y2 - y1
  let m = Math.abs(ry / rx)  // calculate gradient
  let dx, dy;   // dx and dy set the direction of coordinate passing
  if (rx > 0){
    dx = 1 
  } else {
    dx = -1
  }
  if (ry > 0){
    dy = 1
  } else {
    dy = -1
  }
  // if rx > ry the line needs to take more steps on the x axis than the y axis
  // meaning we need to travel along each x coordinate between x1 and x2
  if (Math.abs(rx) > Math.abs(ry)){
    let y = y1;
    if (x1 < x2){   // traversing x in positive direction
      for (let i = x1; i < x2; i++){
        y += m * dy
        let j = Math.round(y)   // rounding to the next full number because of the array...
        matrix[j][i] = true;
      }
    } else{         // traversing x in negative direction
      for (let i = x1; i > x2; i--){
        y += m * dy
        let j = Math.round(y)
        matrix[j][i] = true;
      }
    }
    
  } else{
    let x = x1;
    if (y1 < y2){
      for (let i = y1; i < y2; i++){
        x += 1/m * dx
        let j = Math.round(x)
        matrix[i][j] = true;
      }
    } else{
      for (let i = y1; i > y2; i--){
        x += 1/m * dx
        let j = Math.round(x)
        matrix[i][j] = true;
      }
    }
  }
}

const drawPoint = (matrix, pointsMatrix, [x, y]) => {
  // RADIUS of point = 20px
  // for simplicity & time reasons I wont mark a circle around the point
  // but a square with sides of 18px
  const MARGIN = RADIUS
  const WIDTH = Math.round(Dimensions.get("window").width * 0.9);  
  const HEIGHT = Math.round(Dimensions.get("window").height * 0.7);
  
  let xStart = x - MARGIN
  let yStart = y - MARGIN
  let xEnd = x + MARGIN
  let yEnd = y + MARGIN
  // checking for edge errors
  if (xStart < 0){
    xStart = 0
  }
  if (xEnd > WIDTH){
    xEnd = WIDTH
  }
  if (yStart < 0){
    yStart = 0
  }
  if (yEnd > HEIGHT){
    yEnd = HEIGHT
  }
  for (let i = xStart; i < xEnd; i++){
    for (let j = yStart; j < yEnd; j++){
      matrix[j][i] = true;
      pointsMatrix[j][i] = true;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});

AppRegistry.registerComponent("BestGameEver", () => BestGameEver);
