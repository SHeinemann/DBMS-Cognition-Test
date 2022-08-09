// parts of the game.js, renderer.js and systems.js files are taken from the official library
// github page. This mainly concerns the structure of the game, not the functionality.
// Source: https://github.com/bberak/react-native-game-engine

const MoveFinger = (entities, { touches }) => {
    
    touches.filter(t => t.type === "move").forEach(t => {
      
      let touchX = Math.round(t.event.pageX) - 40
      let touchY = Math.round(t.event.pageY) - 40

      const MARGIN = 18 // circles radius = 20 -> checking square instead of circle

      let length = Object.keys(entities).length - 1

      for (let i = 0; i < length; i++){
        let entX = Math.round(entities[i].position[0])
        let entY = Math.round(entities[i].position[1])
        
        // there should not be any boundary problems because coordinates are padded by 20 in the game
        let startX = entX - MARGIN
        let startY = entY - MARGIN
        let endX = entX + MARGIN
        let endY = entY + MARGIN
        
        // check if touch coordinates collide with a circle entity by checking a square around each entity
        for (let x = startX; x < endX; x++){
          for (let y = startY; y < endY; y++){
            if (touchX == x && touchY == y){
              if (i == 0){ // first object
                entities[i].touched = true
                entities[i].color = "green"
              } else {
                console.log(i)
                if (entities[i-1].touched){
                  entities[i].touched = true
                  entities[i].color = "green"
                }
              }
            }
          }
        }
        
      }
    })
    
    
    
    
    /*
    touches.filter(t => t.type === "move").forEach(t => {
      let finger = entities[t.id];
      if (finger && finger.position) {
        finger.position = [
          finger.position[0] + t.delta.pageX,
          finger.position[1] + t.delta.pageY
        ];
      }
    });*/
  
    return entities;
  };
  
  
  export { MoveFinger };
  