const express = require('express');

const app = express();
const socket = require('socket.io');
const shortid = require('shortid');
const port = process.env.PORT || 8080;

server = app.listen(port, function(){console.log('Server is running on port 8080')});

io = socket(server);
io.sockets.setMaxListeners(0);

let players = [];
let maps = [ {
    name: 'default',
    floor: 'grass',
    tiles: [
        [0,0,1,1,1,1,1,1,1,1,0,0,0,0,0],
        [0,0,2,2,2,2,2,2,2,2,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    initPos: {x: 0, y: 0},
    mobs: [
        {
            name: 'mob-1',
            mode: 'WALK',
            target: '',
            initPos: {x: 4, y: 4},
            lastPos: {x: -1, y: -1},
            pos: {x: 4, y: 4},
            sprite: {x: 3, y: 0},
            mov: {dir: 'DOWN', lastDir: '', step: 0, maxStep: 3},
            att: {hp: 80, maxHP: 100, atk: 10, def: 5, atkArea: 1, resDelay: 3, resCounter: 0, level: 0, xp: 10},
        },
        {
            name: 'mob-1',
            mode: 'WALK',
            target: '',
            initPos: {x: 4, y: 4},
            lastPos: {x: -1, y: -1},
            pos: {x: 4, y: 4},
            sprite: {x: 3, y: 0},
            mov: {dir: 'DOWN', lastDir: '', step: 0, maxStep: 3},
            att: {hp: 80, maxHP: 100, atk: 10, def: 5, atkArea: 1, resDelay: 3, resCounter: 0, level: 0, xp: 10},
        },
        {
            name: 'mob-1',
            mode: 'WALK',
            target: '',
            initPos: {x: 4, y: 4},
            lastPos: {x: -1, y: -1},
            pos: {x: 4, y: 4},
            sprite: {x: 3, y: 0},
            mov: {dir: 'DOWN', lastDir: '', step: 0, maxStep: 3},
            att: {hp: 80, maxHP: 100, atk: 10, def: 5, atkArea: 1, resDelay: 3, resCounter: 0, level: 0, xp: 10},
        },
        {
            name: 'mob-1',
            mode: 'WALK',
            target: '',
            initPos: {x: 4, y: 4},
            lastPos: {x: -1, y: -1},
            pos: {x: 4, y: 4},
            sprite: {x: 3, y: 0},
            mov: {dir: 'DOWN', lastDir: '', step: 0, maxStep: 3},
            att: {hp: 80, maxHP: 100, atk: 10, def: 5, atkArea: 1, resDelay: 3, resCounter: 0, level: 0, xp: 10},
        },
        {
            name: 'mob-1',
            mode: 'WALK',
            target: '',
            initPos: {x: 4, y: 4},
            lastPos: {x: -1, y: -1},
            pos: {x: 4, y: 4},
            sprite: {x: 3, y: 0},
            mov: {dir: 'DOWN', lastDir: '', step: 0, maxStep: 3},
            att: {hp: 80, maxHP: 100, atk: 10, def: 5, atkArea: 1, resDelay: 3, resCounter: 0, level: 0, xp: 10},
        },

    ],

    itens: [

    ],

}];

let itens = [
    {
        name: 'HP',
        desc: 'Aumenta o hp do player',
        kind: 'hpPotion',
        img: '/sprites/potion.png',
        att: {
            hp: 20,
        },
    }
]

let ImpassableTile = [1,2]; 

const SIZE = 40;
const windowsSize = {x: 15, y: 10};

const MOVEMENTS =  ['DOWN','LEFT', 'RIGHT', 'UP'];

const canMove = (newPosX, newPosY, currentMap) => {

    if(newPosX < 0 || newPosX >= windowsSize.x || newPosY < 0 || newPosY >= windowsSize.y ){ return false; }

    const nextTile = currentMap.tiles[newPosY][newPosX];

    const mobArea = currentMap.mobs.find( m => {return (m.pos.x === newPosX && m.pos.y === newPosY && m.mode !== 'DEAD' )} )    
    const playerArea = players.find( p => { return (p.pos.x === newPosX && p.pos.y === newPosY && p.pos.map === currentMap.name && p.mode !== 'DEAD'  ) })
    
    if(!ImpassableTile.includes(nextTile)){

        if(mobArea === undefined && playerArea === undefined ){
            return true;
        }

    }

    return false
}

const nexStep = ( walker, mov) => {

    if(walker.mov.lastDir != ''){ walker.mov.step++; }

    if(walker.mov.step >= walker.mov.maxStep ){ walker.mov.step = 0; }

    walker.mov.lastDir =  walker.dir;
    walker.mov.dir = mov;

}

const calcMov = ( walker, mov, currentMap ) => {

    let newPosX = walker.pos.x;
    let newPosY = walker.pos.y;

    if( mov === 'UP' ){
        newPosY = walker.pos.y - 1;
    }else if( mov === 'LEFT' ){
        newPosX = walker.pos.x - 1;
    }else if( mov === 'DOWN' ){
        newPosY = walker.pos.y + 1;
    }else if( mov === 'RIGHT' ){
        newPosX = walker.pos.x + 1;
    }

    if( canMove(newPosX, newPosY, currentMap) ){
        walker.lastPos.x = walker.pos.x;
        walker.lastPos.y = walker.pos.y;
        walker.pos.x = newPosX;
        walker.pos.y = newPosY;
    }

    nexStep(walker, mov);
    
}

const calcAtk = (atker, defer) => {
        
    let {dir} = atker.mov;
    let atkPos = {x: atker.pos.x , y: atker.pos.y};

    if(dir === 'LEFT'){ atkPos.x -= 1; }
    else if(dir === 'RIGHT'){ atkPos.x += 1; }
    else if(dir === 'UP'){ atkPos.y -= 1; }
    else if(dir === 'DOWN'){ atkPos.y += 1; }

    let enemy = defer.find( ( d ) => { return( d.pos.x === atkPos.x && d.pos.y === atkPos.y && d.mode !== 'DEAD'); });

    if(enemy === undefined){ return; }


    let damage = atker.att.atk - enemy.att.def;

    if (damage <= 0){ return; }

    enemy.att.hp -= damage;

    if(enemy.att.hp <= 0){ enemy.mode = "DEAD"; }

    return enemy;

}



setInterval( () => {

    deadPlayers = players.filter( p => { return p.mode === "DEAD" });

    if( deadPlayers.length > 0 ){

        deadPlayers.forEach( player =>{
            player.att.resCounter += 1;

            if(player.att.resCounter > player.att.resDelay){
                player.att.resCounter = 0;
                player.mode = 'WALK';
                player.att.hp = player.att.maxHP;

                const currentMap = maps.find( (m) => player.pos.map === m.name );

                player.pos.x = currentMap.initPos.x;
                player.pos.y = currentMap.initPos.y;

            }

        });

    }

    

    maps.forEach( map => {

        map.itens.forEach( ( item ) => {

            item.desapear -= 1;

            if(item.desapear <= 0 ){

                const tempItem = map.itens.filter( (i) => { return i.id !== item.id });
                map.itens = tempItem;

                let connRes = `{ "map": ${JSON.stringify(map)}, "player": "" }`;
                io.emit('DROPPED_ITEM', connRes);

            }

        })


        map.mobs.forEach( mob => {

            let inMobArea;

            if( mob.mode === 'DEAD' ){
                mob.att.resCounter += 1;
                if( mob.att.resCounter > mob.att.resDelay ){
                    mob.att.resCounter = 0;
                    mob.mode = 'WALK';
                    mob.att.hp = mob.att.maxHP;
                    mob.pos.x = mob.initPos.x;
                    mob.pos.y = mob.initPos.y;
            }

            }else{

                inMobArea = players.filter( p => { return  (
                    (p.pos.map === map.name) &&  ( p.mode !== 'DEAD' ) &&
                    (p.pos.x >= (mob.pos.x - mob.att.atkArea) && p.pos.x <= (mob.pos.x + mob.att.atkArea)) &&
                    (p.pos.y >= (mob.pos.y - mob.att.atkArea) && p.pos.y <= (mob.pos.y + mob.att.atkArea)) 
                )});
    
                let mobMov = 'DOWN';
    
                if(mob.target != '' ){
                    inMobArea = players.filter( p => { return  (
                        (p.pos.map === map.name) && ( p.mode !== 'DEAD' ) &&
                        (p.pos.x >= (mob.pos.x - mob.att.atkArea) && p.pos.x <= (mob.pos.x + mob.att.atkArea)) &&
                        (p.pos.y >= (mob.pos.y - mob.att.atkArea) && p.pos.y <= (mob.pos.y + mob.att.atkArea)) &&
                        (p.id === mob.target) )});
                }
            
                if ( inMobArea.length > 0 ){ 
                    
                    mob.mode = 'ATK'; 
                    mob.target = inMobArea[0].id;
                } 
                else { 
                    mob.mode = 'WALK'; 
                    mob.target = '' 
                }

            }                

            if(mob.mode === 'ATK'){
                
                if      ( inMobArea[0].pos.x < mob.pos.x ) { mobMov = 'LEFT'; }
                else if ( inMobArea[0].pos.x > mob.pos.x ) { mobMov = 'RIGHT'; }
                else if ( inMobArea[0].pos.y < mob.pos.y ) { mobMov = 'UP'; }
                else if ( inMobArea[0].pos.y > mob.pos.y ) { mobMov = 'DOWN'; }

                nexStep( mob, mobMov);

                calcAtk(mob, inMobArea);

            }else if(mob.mode === 'WALK')
            {
                mobMov = MOVEMENTS[Math.floor(Math.random() * 4)];

                calcMov(mob, mobMov, map);

            }
                
            

        });

        
    });

    let connRes = `{ "resMap": ${JSON.stringify(maps)}, "resPlayers": ${JSON.stringify(players)} }`;

    io.emit('MOB_MOV', connRes );
}, 1000);

io.on('connection', (socket) => {
    socket.setMaxListeners(0);

    const player = {    id: socket.id,                
                        mode: 'WALK',
                        lastPos: {x: -1, y: -1 }, 
                        pos: {map:'default', x: 0, y: 0 }, 
                        sprite: {x: 0, y: 0}, 
                        mov: {dir: 'DOWN', lastDir: '', step: 0, maxStep: 3}, 
                        att: {hp: 80, maxHP: 100, atk: 10, def: 5, atkArea: 1, resDelay: 3, resCounter: 0,level: 1, xp: 10},
                        inventary: { bag:[] },
                    };

    socket.join(player.pos.map);

    players.push(player);

    let currentMap = maps.find( (m) => { return m.name === player.pos.map});
   
    let connRes = `{ "map": ${JSON.stringify(currentMap)}, "players": ${JSON.stringify(players)}, "player":  ${JSON.stringify(player)}}`;

    socket.emit('connection', connRes);
    socket.to(player.pos.map).emit('MOVE_PLAYER', connRes);

    socket.on( 'MOVE_PLAYER', (move) => {

        if(player.mode === 'DEAD'){ return; }

        currentMap = maps.find( (m) => { return m.name === player.pos.map});

        calcMov( player, move, currentMap );

        players = players.filter( (p) => { return p.id !== player.id});
        players.push(player);

        changeMap = false;
        if(changeMap){
            currentMap = maps.find( (m) => { return m.name === player.pos.map});
            connRes = `{ "map": ${JSON.stringify(currentMap)}, "players": ${JSON.stringify(players)}, "player":  ${JSON.stringify(player)} }`;
        }else{
            connRes = `{ "map": "", "players": ${JSON.stringify(players)}, "player":  ${JSON.stringify(player)} }`;
        }
        

        socket.emit('MOVE_PLAYER', connRes);
        socket.to(player.pos.map).emit('MOVE_PLAYER', connRes);

    });

    socket.on( 'PLAYER_ATK', ( key ) => {

        if(player.mode === 'DEAD'){ return; }
        
        if(key === '1'){

            currentMap = maps.find( (m) => { return m.name === player.pos.map});
            
            const enemy = calcAtk(player, currentMap.mobs); 

            if( enemy && enemy.mode === 'DEAD' ){

                const {x, y} = enemy.pos;

                const newDrop = { id: shortid.generate(), ...itens[0], pos: {x: x ,y: y}, desapear: 5 };

                currentMap.itens.push(newDrop);

                connRes = `{ "map": ${JSON.stringify(currentMap)}, "player": ${JSON.stringify(player)} }`;
                
                socket.emit('DROPPED_ITEM', connRes);
                socket.to(player.pos.map).emit('DROPPED_ITEM', connRes);               

            }
            connRes = `{ "mobs": ${JSON.stringify(currentMap.mobs)}, "player":  ${JSON.stringify(player)} }`;
            socket.emit('PLAYER_ATK', connRes);
            socket.to(player.pos.map).emit('PLAYER_ATK', connRes);

        }else if(key === '2'){

            let HpPotion = player.inventary.bag.filter( ( i ) => { return i.kind === 'hpPotion' } );

            if(HpPotion.length <= 0 || player.att.hp > player.att.maxHP){return;}

            let bag =  player.inventary.bag.filter( ( i ) => { return i.kind !== 'hpPotion' } );
            
            HpPotion.pop();

            player.inventary.bag = [...bag,...HpPotion];

            player.att.hp += 50;
            
            if(player.att.hp > player.att.maxHP){
                player.att.hp = player.att.maxHP;
            }

            players = players.filter( (p) => { return p.id !== player.id});
            players.push(player);

            connRes = `{ "players": ${JSON.stringify(players)}, "player":  ${JSON.stringify(player)} }`;
            socket.emit('HP_RECOVERY', connRes);
            socket.to(player.pos.map).emit('HP_RECOVERY', connRes);
        }

    });

    socket.on('GET_DROP', () => {

        currentMap = maps.find( (m) => { return m.name === player.pos.map});
        const droppedItem = currentMap.itens.find( ( i ) => { 
            return (i.pos.x === player.pos.x && i.pos.x === player.pos.x )
        });

        if(droppedItem){

            delete droppedItem.desapear;
            
            player.inventary.bag.push(droppedItem);
            players = players.filter( (p) => { return p.id !== player.id});
            players.push(player);

            const tempItens = currentMap.itens.filter( (i) => { return i.id !== droppedItem.id });
            currentMap.itens = tempItens;

            connRes = `{ "map": ${JSON.stringify(currentMap)}, "player":  ${JSON.stringify(player)} }`;
            socket.emit('DROPPED_ITEM', connRes);
            socket.to(player.pos.map).emit('DROPPED_ITEM', connRes);  

        }

    });


    socket.on('disconnect', (reason) => {
        players = players.filter( (p) => { return p.id !== player.id; });

        connRes = `{ "map": ${JSON.stringify(currentMap)}, "players": ${JSON.stringify(players)} }`;

        socket.to(player.pos.map).emit('MOVE_PLAYER', connRes);
        
    })
});