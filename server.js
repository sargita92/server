const express = require('express');

const app = express();
const socket = require('socket.io');
const shortid = require('shortid');
const port = process.env.PORT || 8080;

server = app.listen(port, function(){console.log('Server is running on port 8080')});

io = socket(server);
io.sockets.setMaxListeners(0);

let players = [];
let maps = [ 
    {
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
                att: {hp: 80, maxHP: 100, atk: 10, def: 5, atkArea: 1, resDelay: 3, resCounter: 0, level: 0, xp: 100},
            },

        ],

        items: [

        ],

        dropTable: [
            { id:   1, dropRate: 1 },
            { id:   2, dropRate: 1 },
            { id:   3, dropRate: 1 },
            { id:   4, dropRate: 1 },
            { id:   5, dropRate: 1 },
            { id:   6, dropRate: 1 },
            { id:   7, dropRate: 1 },
            { id:   8, dropRate: 1 },
            { id:   9, dropRate: 1 },
            { id:  10, dropRate: 1 },
            { id:  11, dropRate: 1 },
            { id:  12, dropRate: 1 },
            { id:  13, dropRate: 1 },
            { id:  14, dropRate: 1 },
            
        ],

        impassableTile: [
            [0,0,0,0,1,1,1,1,1,1,0,0,0,0,2],
            [0,0,1,1,1,1,1,1,1,1,0,0,0,0,2],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        ], 

        teleport: [
            {code: 2, map: 'field_1' }
        ]

    }, 
    {
        name: 'field_1',
        floor: 'grass',
        tiles: [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,1,1,0,0,0,2,0,0,0,0,0,0,0],
            [0,0,1,0,1,0,2,0,2,0,0,0,0,0,0],
            [0,0,1,1,0,0,2,0,2,0,0,0,0,0,0],
            [0,0,1,0,1,0,2,0,2,0,0,0,0,0,0],
            [0,0,1,0,1,0,2,0,2,0,0,0,0,0,0],
            [0,0,1,0,1,0,2,0,2,0,0,0,0,0,0],
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
                att: {hp: 80, maxHP: 100, atk: 10, def: 5, atkArea: 1, resDelay: 3, resCounter: 0, level: 0, xp: 100},
            },

        ],

        items: [

        ],

        dropTable: [
            { id:   1, dropRate: 1 },
            { id:   2, dropRate: 1 },
            { id:   3, dropRate: 1 },
            { id:   4, dropRate: 1 },
            { id:   5, dropRate: 1 },
            { id:   6, dropRate: 1 },
            { id:   7, dropRate: 1 },
            { id:   8, dropRate: 1 },
            { id:   9, dropRate: 1 },
            { id:  10, dropRate: 1 },
            { id:  11, dropRate: 1 },
            { id:  12, dropRate: 1 },
            { id:  13, dropRate: 1 },
            { id:  14, dropRate: 1 },
            
        ],

        impassableTile: [
            [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [2,0,1,1,0,0,0,1,0,0,0,0,0,0,0],
            [2,0,1,0,1,0,1,0,1,0,0,0,0,0,0],
            [2,0,1,1,0,0,1,0,1,0,0,0,0,0,0],
            [2,0,1,0,1,0,1,0,1,0,0,0,0,0,0],
            [2,0,1,0,1,0,1,0,1,0,0,0,0,0,0],
            [2,0,1,0,1,0,1,0,1,0,0,0,0,0,0],
            [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ], 

        teleport: [
            {code: 2, map: 'default' }
        ]

    },
];

let items = [
    {
        id: 0,
        name: 'HP',
        desc: 'Aumenta o hp do player',
        kind: 'hpPotion',
        img: '/sprites/potion.png',
        att: {
            hp: 20,
        },
    },
    {
        id: 1,
        name: 'First Helmet',
        desc: 'First Helmet',
        kind: 'helmet',
        img: '/sprites/helmet_1.png',
        att: {
            def: 10,
            hp: 10
        },
        requirement: {
            str: 20,
            int: 10,
            dex: 20,
        }
    },
    {
        id: 2,
        name: 'First shoulder',
        desc: 'First shoulder',
        kind: 'shoulder',
        img: '/sprites/shoulder_1.png',
        att: {
            def: 10,
            hp: 10
        },
        requirement: {
            str: 20,
            int: 10,
            dex: 20,
        }
    },
    {
        id: 3,
        name: 'First ring',
        desc: 'First ring',
        kind: 'ring',
        img: '/sprites/ring_1.png',
        att: {
            def: 10,
            hp: 10
        },
        requirement: {
            str: 20,
            int: 10,
            dex: 20,
        }
    },
    {
        id: 4,
        name: 'Second ring',
        desc: 'Second ring',
        kind: 'ring',
        img: '/sprites/ring_2.png',
        att: {
            def: 10,
            hp: 10
        },
        requirement: {
            str: 20,
            int: 10,
            dex: 20,
        }
    },
    {
        id: 5,
        name: 'First amulet',
        desc: 'First amulet',
        kind: 'amulet',
        img: '/sprites/amulet_1.png',
        att: {
            def: 10,
            hp: 10
        },
        requirement: {
            str: 20,
            int: 10,
            dex: 20,
        }
    },
    {
        id: 6,
        name: 'First saddle',
        desc: 'First saddle',
        kind: 'saddle',
        img: '/sprites/saddle_1.png',
        att: {
            def: 10,
            hp: 10
        },
        requirement: {
            str: 20,
            int: 10,
            dex: 20,
        }
    },
    {
        id: 7,
        name: 'First armor',
        desc: 'First armor',
        kind: 'armor',
        img: '/sprites/armor_1.png',
        att: {
            def: 10,
            hp: 10
        },
        requirement: {
            str: 20,
            int: 10,
            dex: 20,
        }
    },
    {
        id: 8,
        name: 'First gauntlet',
        desc: 'First gauntlet',
        kind: 'gauntlet',
        img: '/sprites/gauntlet_1.png',
        att: {
            def: 10,
            hp: 10
        },
        requirement: {
            str: 20,
            int: 10,
            dex: 20,
        }
    },
    {
        id: 9,
        name: 'Second weapon',
        desc: 'Second weapon',
        kind: 'weapon',
        img: '/sprites/sword_1.png',
        att: {
            atk: 10,
        },
        requirement: {
            str: 20,
            int: 10,
            dex: 20,
        }
    },
    {
        id: 10,
        name: 'First boot',
        desc: 'First boot',
        kind: 'boot',
        img: '/sprites/boot_1.png',
        att: {
            def: 10,
            hp: 10
        },
        requirement: {
            str: 20,
            int: 10,
            dex: 20,
        }
    },
    {
        id: 11,
        name: 'First shield',
        desc: 'First shield',
        kind: 'offHand',
        img: '/sprites/shield_1.png',
        att: {
            def: 10,
            hp: 10
        },
        requirement: {
            str: 20,
            int: 10,
            dex: 20,
        }
    },
    {
        id: 12,
        name: 'Cooper',
        desc: 'Cooper amount',
        kind: 'cooper',
        img: '/sprites/cooper.png',
        att: {
            amount: 10,
        },
    },
    {
        id: 13,
        name: 'Silver',
        desc: 'Silver amount',
        kind: 'silver',
        img: '/sprites/silver.png',
        att: {
            amount: 1,
        },
    },
    {
        id: 14,
        name: 'Gold',
        desc: 'Gold amount',
        kind: 'gold',
        img: '/sprites/gold.png',
        att: {
            amount: 1,
        },
    },

]



const SIZE = 40;
const windowsSize = {x: 15, y: 10};
const maxLvl = 100;

const MOVEMENTS =  ['DOWN','LEFT', 'RIGHT', 'UP'];

const canMove = ( newPosX, newPosY, currentMap) => {

    if(newPosX < 0 || newPosX >= windowsSize.x || newPosY < 0 || newPosY >= windowsSize.y ){ return false; }

    const nextTile = currentMap.tiles[newPosY][newPosX];

    const mobArea = currentMap.mobs.find( m => {return (m.pos.x === newPosX && m.pos.y === newPosY && m.mode !== 'DEAD' )} )    
    const playerArea = players.find( p => { return (p.pos.x === newPosX && p.pos.y === newPosY && p.pos.map === currentMap.name && p.mode !== 'DEAD'  ) })
    
    if(currentMap.impassableTile[newPosY][newPosX] !== 1 && mobArea === undefined && playerArea === undefined){

        return true;

    }

    return false
}

const nexStep = ( walker, mov) => {

    if(walker.mov.lastDir != ''){ walker.mov.step++; }

    if(walker.mov.step >= walker.mov.maxStep ){ walker.mov.step = 0; }

    walker.mov.lastDir =  walker.dir;
    walker.mov.dir = mov;

}

const calcMov = ( walker, mov, currentMap) => {

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

    walker.lastPos.x = walker.pos.x;
    walker.lastPos.y = walker.pos.y;

    if( canMove(newPosX, newPosY, currentMap) ){
        walker.pos.x = newPosX;
        walker.pos.y = newPosY;
    }



    nexStep(walker, mov);
    
}

const newMap = (socket, currentMap, player ) => 
{
    let tileType = currentMap.impassableTile[player.pos.y][player.pos.x];

    console.log(`(${player.pos.x}, ${player.pos.y}) <= (${player.lastPos.x}, ${player.lastPos.y})`);

    if( tileType > 1 && player.pos.y === player.lastPos.y && player.pos.x === player.lastPos.x){

        let teleport = currentMap.teleport.find( (t) => t.code === tileType);
        let nextMap  = maps.find( (m) => m.name == teleport.map );
        let currentPlayer = players.find( (p) => p.id === player.id );

        socket.leave(currentMap.name);

        currentPlayer.pos.x = nextMap.initPos.x;
        currentPlayer.pos.y = nextMap.initPos.y;

        currentPlayer.lastPos.x = -1;
        currentPlayer.lastPos.y = -1;

        currentPlayer.pos.map = teleport.map;

        player = currentPlayer;

        socket.join(currentPlayer.pos.map);

        return true;
        //teleport: [ {code: 2, dir: 'left',  map: 'field_1' } ]

    }

    return false;

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

    if (damage <= 0){ damage = 1; }

    enemy.att.hp -= damage;

    if(enemy.att.hp <= 0){ enemy.mode = "DEAD"; }

    return enemy;

}

const calcDrop = (currentMap, enemy) => {
    if( currentMap.dropTable.length <= 0 ){return;}

    let num = currentMap.dropTable[Math.floor(Math.random() * currentMap.dropTable.length )].id;
    

    const {x, y} = enemy.pos;

    const newDrop = { id: shortid.generate(), ...items[num], pos: {x: x ,y: y}, disappear: 5 };

    return newDrop;

}

const setPlayerAtt = (player) => {

    player.att.maxHP = player.upPoints.maxHP * player.att.level;
    player.att.atk = player.upPoints.atk * player.att.level;
    player.att.def = player.upPoints.def * player.att.level;

    if(player.inventory.equipments.shoulders.id){
        if(player.inventory.equipments.shoulders.att.atk){ player.att.atk += player.inventory.equipments.shoulders.att.atk  }
        if(player.inventory.equipments.shoulders.att.def){ player.att.def += player.inventory.equipments.shoulders.att.def  }
        if(player.inventory.equipments.shoulders.att.hp) { player.att.maxHP += player.inventory.equipments.shoulders.att.hp }
    }

    if(player.inventory.equipments.head.id){
        if(player.inventory.equipments.head.att.atk){ player.att.atk += player.inventory.equipments.head.att.atk  }
        if(player.inventory.equipments.head.att.def){ player.att.def += player.inventory.equipments.head.att.def  }
        if(player.inventory.equipments.head.att.hp) { player.att.maxHP += player.inventory.equipments.head.att.hp }
    }

    if(player.inventory.equipments.lRing.id){
        if(player.inventory.equipments.lRing.att.atk){ player.att.atk += player.inventory.equipments.lRing.att.atk  }
        if(player.inventory.equipments.lRing.att.def){ player.att.def += player.inventory.equipments.lRing.att.def  }
        if(player.inventory.equipments.lRing.att.hp) { player.att.maxHP += player.inventory.equipments.lRing.att.hp }
    }

    if(player.inventory.equipments.rRing.id){
        if(player.inventory.equipments.rRing.att.atk){ player.att.atk += player.inventory.equipments.rRing.att.atk  }
        if(player.inventory.equipments.rRing.att.def){ player.att.def += player.inventory.equipments.rRing.att.def  }
        if(player.inventory.equipments.rRing.att.hp) { player.att.maxHP += player.inventory.equipments.rRing.att.hp }
    }

    if(player.inventory.equipments.amulet.id){
        if(player.inventory.equipments.amulet.att.atk){ player.att.atk += player.inventory.equipments.amulet.att.atk  }
        if(player.inventory.equipments.amulet.att.def){ player.att.def += player.inventory.equipments.amulet.att.def  }
        if(player.inventory.equipments.amulet.att.hp) { player.att.maxHP += player.inventory.equipments.amulet.att.hp }
    }

    if(player.inventory.equipments.mount.id){
        if(player.inventory.equipments.mount.att.atk){ player.att.atk += player.inventory.equipments.mount.att.atk  }
        if(player.inventory.equipments.mount.att.def){ player.att.def += player.inventory.equipments.mount.att.def  }
        if(player.inventory.equipments.mount.att.hp) { player.att.maxHP += player.inventory.equipments.mount.att.hp }
    }

    if(player.inventory.equipments.chest.id){
        if(player.inventory.equipments.chest.att.atk){ player.att.atk += player.inventory.equipments.chest.att.atk  }
        if(player.inventory.equipments.chest.att.def){ player.att.def += player.inventory.equipments.chest.att.def  }
        if(player.inventory.equipments.chest.att.hp) { player.att.maxHP += player.inventory.equipments.chest.att.hp }
    }

    if(player.inventory.equipments.hand.id){
        if(player.inventory.equipments.hand.att.atk){ player.att.atk += player.inventory.equipments.hand.att.atk  }
        if(player.inventory.equipments.hand.att.def){ player.att.def += player.inventory.equipments.hand.att.def  }
        if(player.inventory.equipments.hand.att.hp) { player.att.maxHP += player.inventory.equipments.hand.att.hp }
    }

    if(player.inventory.equipments.weapon.id){
        if(player.inventory.equipments.weapon.att.atk){ player.att.atk += player.inventory.equipments.weapon.att.atk  }
        if(player.inventory.equipments.weapon.att.def){ player.att.def += player.inventory.equipments.weapon.att.def  }
        if(player.inventory.equipments.weapon.att.hp) { player.att.maxHP += player.inventory.equipments.weapon.att.hp }
    }

    if(player.inventory.equipments.feet.id){
        if(player.inventory.equipments.feet.att.atk){ player.att.atk += player.inventory.equipments.feet.att.atk  }
        if(player.inventory.equipments.feet.att.def){ player.att.def += player.inventory.equipments.feet.att.def  }
        if(player.inventory.equipments.feet.att.hp) { player.att.maxHP += player.inventory.equipments.feet.att.hp }
    }

    if(player.inventory.equipments.offHand.id){
        if(player.inventory.equipments.offHand.att.atk){ player.att.atk += player.inventory.equipments.offHand.att.atk  }
        if(player.inventory.equipments.offHand.att.def){ player.att.def += player.inventory.equipments.offHand.att.def  }
        if(player.inventory.equipments.offHand.att.hp) { player.att.maxHP += player.inventory.equipments.offHand.att.hp }
    }

    player.att.hp = player.att.maxHP;

}



setInterval( () => {

    deadPlayers = players.filter( p => { return p.mode === "DEAD" });

    if( deadPlayers.length > 0 ){

        deadPlayers.forEach( player =>{
            player.att.resCounter += 1;

            if(player.att.resCounter > player.att.resDelay){
                const currentMap = maps.find( (m) => player.pos.map === m.name );

                player.lastPos.x = currentMap.initPos.x;
                player.lastPos.y = currentMap.initPos.y;

                player.att.resCounter = 0;
                player.mode = 'WALK';
                player.att.hp = player.att.maxHP;

                player.pos.x = currentMap.initPos.x;
                player.pos.y = currentMap.initPos.y;

            }

        });

    }

    

    maps.forEach( map => {

        map.items.forEach( ( item ) => {

            item.disappear -= 1;

            if(item.disappear <= 0 ){

                const tempItem = map.items.filter( (i) => { return i.id !== item.id });
                map.items = tempItem;

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
                        lastPos: {x: 0, y: 0 }, 
                        pos: {map:'default', x: 0, y: 0 }, 
                        sprite: {x: 0, y: 0}, 
                        mov: {dir: 'DOWN', lastDir: '', step: 0, maxStep: 3},
                        upPoints: { 
                            str: 10,
                            int: 10,
                            dex: 10,
                            maxHP: 100,
                            atk: 10, 
                            def: 5,                          
                         }, 
                        att: {
                            hp: 80, 
                            atkArea: 1, 
                            resDelay: 3, 
                            resCounter: 0,
                            xp: 0,
                            level: 1,
                            str: 10,
                            int: 10,
                            dex: 10,
                            maxHP: 100,
                            atk: 10, 
                            def: 5, 

                            },
                        inventory: {
                            equipments:{
                                head: {},
                                shoulders: {},
                                amulet: {},
                                lRing: {},
                                rRing: {},
                                mount: {},
                                chest: {},
                                hand: {},
                                weapon: {},
                                feet: {},
                                offHand: {}, 
                            }, 
                            bag: [],
                            inventory: [], 
                            money: {
                                gold: 0,
                                silver: 0,
                                cooper: 0,
                            },
                        },
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

        calcMov( player, move, currentMap);

        players = players.filter( (p) => { return p.id !== player.id});
        players.push(player);

        changeMap = newMap(socket, currentMap, player);

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

                if(player.att.level < maxLvl){

                    player.att.xp += enemy.att.xp;
                    
                    if( player.att.xp >= (player.att.level * 300)){
                        player.att.level += 1;


                        player.att.str = player.upPoints.str * player.att.level;
                        player.att.int = player.upPoints.int * player.att.level;
                        player.att.dex = player.upPoints.dex * player.att.level;
                        player.att.xp = 0;

                        setPlayerAtt(player);

    
                    }
                }

                currentMap.items.push( calcDrop(currentMap, enemy) );

                connRes = `{ "map": ${JSON.stringify(currentMap)}, "player": ${JSON.stringify(player)} }`;
                
                socket.emit('DROPPED_ITEM', connRes);
                socket.to(player.pos.map).emit('DROPPED_ITEM', connRes);               

            }
            connRes = `{ "mobs": ${JSON.stringify(currentMap.mobs)}, "player":  ${JSON.stringify(player)} }`;
            socket.emit('PLAYER_ATK', connRes);
            socket.to(player.pos.map).emit('PLAYER_ATK', connRes);

        }else if(key === '2'){

            let HpPotion = player.inventory.bag.filter( ( i ) => { return i.kind === 'hpPotion' } );

            if(HpPotion.length <= 0 || player.att.hp > player.att.maxHP){return;}

            let bag =  player.inventory.bag.filter( ( i ) => { return i.kind !== 'hpPotion' } );
            
            HpPotion.pop();

            player.inventory.bag = [...bag,...HpPotion];

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
        const droppedItem = currentMap.items.find( ( i ) => { 
            return (i.pos.x === player.pos.x && i.pos.x === player.pos.x )
        });

        if(droppedItem){

            delete droppedItem.disappear;

            if(droppedItem.kind === 'hpPotion'){
                player.inventory.bag.push(droppedItem);
            }else if(droppedItem.kind === 'cooper'){
                player.inventory.money.cooper += droppedItem.att.amount;

                if(player.inventory.money.cooper > 999){ 
                    player.inventory.money.silver += 1;
                    player.inventory.money.cooper -= 1000; 
                }

            }else if(droppedItem.kind === 'silver'){
                player.inventory.money.silver += droppedItem.att.amount;

                if(player.inventory.money.silver > 999){ 
                    player.inventory.money.gold += 1;
                    player.inventory.money.silver -= 1000; 
                }
                
            }else if(droppedItem.kind === 'gold'){
                player.inventory.money.gold += droppedItem.att.amount;
            }
            
            else{
                if(player.inventory.inventory.length >= 45 ){return;}
                player.inventory.inventory.push(droppedItem);
            }

            players = players.filter( (p) => { return p.id !== player.id});
            players.push(player);

            const tempItems = currentMap.items.filter( (i) => { return i.id !== droppedItem.id });
            currentMap.items = tempItems;

            connRes = `{ "map": ${JSON.stringify(currentMap)}, "player":  ${JSON.stringify(player)} }`;
            socket.emit('DROPPED_ITEM', connRes);
            socket.to(player.pos.map).emit('DROPPED_ITEM', connRes);  

        }

    });

    socket.on('EQUIP_ITEM', (index) => {

        let currentItem = player.inventory.inventory[index];

        if(!currentItem){ return; }

        if( currentItem.requirement.str > player.att.str ||
            currentItem.requirement.int > player.att.int ||
            currentItem.requirement.dex > player.att.dex ){ return; }

        if(currentItem && currentItem.kind === 'shoulder'){
            if(player.inventory.equipments.shoulders.id){ return; }
            player.inventory.equipments.shoulders = {...currentItem};

        }else if(currentItem && currentItem.kind === 'helmet'){
            if(player.inventory.equipments.head.id){ return; }
            player.inventory.equipments.head = {...currentItem};

        }else if(currentItem && currentItem.kind === 'ring'){
            if(player.inventory.equipments.lRing.id && player.inventory.equipments.rRing.id){ return; }

            if(player.inventory.equipments.lRing.id){ 
                player.inventory.equipments.rRing = {...currentItem}; }
            else{
                player.inventory.equipments.lRing = {...currentItem};
            }

        
        }else if(currentItem && currentItem.kind === 'amulet'){
            if(player.inventory.equipments.amulet.id){ return; }
            player.inventory.equipments.amulet = {...currentItem};

        }else if(currentItem && currentItem.kind === 'saddle'){
            if(player.inventory.equipments.mount.id){ return; }
            player.inventory.equipments.mount = {...currentItem};

        }else if(currentItem && currentItem.kind === 'armor'){
            if(player.inventory.equipments.chest.id){ return; }
            player.inventory.equipments.chest = {...currentItem};

        }else if(currentItem && currentItem.kind === 'gauntlet'){
            if(player.inventory.equipments.hand.id){ return; }
            player.inventory.equipments.hand = {...currentItem};

        }else if(currentItem && currentItem.kind === 'weapon'){
            if(player.inventory.equipments.weapon.id){ return; }
            player.inventory.equipments.weapon = {...currentItem};

        }else if(currentItem && currentItem.kind === 'boot'){
            if(player.inventory.equipments.feet.id){ return; }
            player.inventory.equipments.feet = {...currentItem};

        }else if(currentItem && currentItem.kind === 'offHand'){
            if(player.inventory.equipments.offHand.id){ return; }
            player.inventory.equipments.offHand = {...currentItem};

        }

        player.inventory.inventory.splice(index, 1);
        setPlayerAtt(player);

        connRes = `{ "map": "", "players": ${JSON.stringify(players)} }`;
        socket.emit('MOVE_PLAYER', connRes);
        socket.to(player.pos.map).emit('MOVE_PLAYER', connRes);      
    });

    socket.on('DESEQUIP_ITEM', (kind) => {

        if(player.inventory.inventory.length >= 45 ){return;}

        if( kind === 'shoulders'){
            if(!player.inventory.equipments.shoulders){ return; }
            const tempItem = player.inventory.equipments.shoulders;
            player.inventory.inventory.push(tempItem);
            player.inventory.equipments.shoulders = {};

        }else if( kind === 'head'){
            if(!player.inventory.equipments.head){ return; }
            const tempItem = player.inventory.equipments.head;
            player.inventory.inventory.push(tempItem);
            player.inventory.equipments.head = {};

        }else if( kind === 'lRing'){
            if(!player.inventory.equipments.lRing){ return; }
            const tempItem = player.inventory.equipments.lRing;
            player.inventory.inventory.push(tempItem);
            player.inventory.equipments.lRing = {};

        }else if( kind === 'amulet'){
            const tempItem = player.inventory.equipments.amulet;
            player.inventory.inventory.push(tempItem);
            player.inventory.equipments.amulet = {};

        }else if( kind === 'rRing'){
            if(!player.inventory.equipments.rRing){ return; }
            const tempItem = player.inventory.equipments.rRing;
            player.inventory.inventory.push(tempItem);
            player.inventory.equipments.rRing = {};

        }else if( kind === 'mount'){
            if(!player.inventory.equipments.mount){ return; }
            const tempItem = player.inventory.equipments.mount;
            player.inventory.inventory.push(tempItem);
            player.inventory.equipments.mount = {};

        }else if( kind === 'chest'){
            if(!player.inventory.equipments.chest){ return; }
            const tempItem = player.inventory.equipments.chest;
            player.inventory.inventory.push(tempItem);
            player.inventory.equipments.chest = {};

        }else if( kind === 'hand'){
            if(!player.inventory.equipments.hand){ return; }
            const tempItem = player.inventory.equipments.hand;
            player.inventory.inventory.push(tempItem);
            player.inventory.equipments.hand = {};

        }else if( kind === 'weapon'){
            if(!player.inventory.equipments.weapon){ return; }
            const tempItem = player.inventory.equipments.weapon;
            player.inventory.inventory.push(tempItem);
            player.inventory.equipments.weapon = {};

        }else if( kind === 'feet'){
            if(!player.inventory.equipments.feet){ return; }
            const tempItem = player.inventory.equipments.feet;
            player.inventory.inventory.push(tempItem);
            player.inventory.equipments.feet = {};

        }else if( kind === 'offHand'){
            if(!player.inventory.equipments.offHand){ return; }
            const tempItem = player.inventory.equipments.offHand;
            player.inventory.inventory.push(tempItem);
            player.inventory.equipments.offHand = {};

        }

        setPlayerAtt(player);

        connRes = `{ "map": "", "players": ${JSON.stringify(players)} }`;
        socket.emit('MOVE_PLAYER', connRes);
        socket.to(player.pos.map).emit('MOVE_PLAYER', connRes);      
    });

    socket.on('DROP_ITEM', (index) => {

        if(!player.inventory.inventory[index]){return;}

        currentMap = maps.find( (m) => { return m.name === player.pos.map});

        const newDrop = {...player.inventory.inventory[index], pos: {x: player.pos.x ,y: player.pos.y}, disappear: 5 };
        newDrop.id = shortid.generate();

        currentMap.items.push( newDrop );
        
        player.inventory.inventory.splice(index, 1);

        connRes = `{ "map": ${JSON.stringify(currentMap)}, "players": ${JSON.stringify(players)} }`;
        socket.emit('MOVE_PLAYER', connRes);
        socket.to(player.pos.map).emit('MOVE_PLAYER', connRes);      
    });

    socket.on('disconnect', (reason) => {
        players = players.filter( (p) => { return p.id !== player.id; });

        connRes = `{ "map": "", "players": ${JSON.stringify(players)} }`;

        socket.to(player.pos.map).emit('MOVE_PLAYER', connRes);
        
    })
});