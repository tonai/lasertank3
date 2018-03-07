/* Load classes */
var blocks = {
    ArrowAbstract: require('./Abstract/ArrowAbstract.js'),
    BlockAbstract: require('./Abstract/BlockAbstract.js'),
    DoorAbstract: require('./Abstract/DoorAbstract.js'),
    EnemyAbstract: require('./Abstract/EnemyAbstract.js'),
    KeyAbstract: require('./Abstract/KeyAbstract.js'),
    MirrorAbstract: require('./Abstract/MirrorAbstract.js'),
    MovableEnemyAbstract: require('./Abstract/MovableEnemyAbstract.js'),
    MovableMirrorAbstract: require('./Abstract/MovableMirrorAbstract.js'),
    RotatingMirrorAbstract: require('./Abstract/RotatingMirrorAbstract.js'),
    TeleporterAbstract: require('./Abstract/TeleporterAbstract.js'),
    ArrowDown: require('./Arrow/ArrowDown.js'),
    ArrowLeft: require('./Arrow/ArrowLeft.js'),
    ArrowRight: require('./Arrow/ArrowRight.js'),
    ArrowUp: require('./Arrow/ArrowUp.js'),
    Block: require('./Block/Block.js'),
    BreakableBlock: require('./Block/BreakableBlock.js'),
    CrossBlock: require('./Block/CrossBlock.js'),
    MovableBlock: require('./Block/MovableBlock.js'),
    Door1: require('./Door/Door1.js'),
    Door2: require('./Door/Door2.js'),
    Door3: require('./Door/Door3.js'),
    Door4: require('./Door/Door4.js'),
    Door5: require('./Door/Door5.js'),
    Door6: require('./Door/Door6.js'),
    Door7: require('./Door/Door7.js'),
    Door8: require('./Door/Door8.js'),
    DoubleMirrorDLUR: require('./DoubleMirror/DoubleMirrorDLUR.js'),
    DoubleMirrorDRUL: require('./DoubleMirror/DoubleMirrorDRUL.js'),
    BrokenEnemyDown: require('./Enemy/BrokenEnemyDown.js'),
    BrokenEnemyLeft: require('./Enemy/BrokenEnemyLeft.js'),
    BrokenEnemyRight: require('./Enemy/BrokenEnemyRight.js'),
    BrokenEnemyUp: require('./Enemy/BrokenEnemyUp.js'),
    EnemyDown: require('./Enemy/EnemyDown.js'),
    EnemyLeft: require('./Enemy/EnemyLeft.js'),
    EnemyRight: require('./Enemy/EnemyRight.js'),
    EnemyUp: require('./Enemy/EnemyUp.js'),
    BreakedIce: require('./Ground/BreakedIce.js'),
    Floor: require('./Ground/Floor.js'),
    Ice: require('./Ground/Ice.js'),
    Water: require('./Ground/Water.js'),
    FireInterface: require('./Interface/FireInterface.js'),
    MovableInterface: require('./Interface/MovableInterface.js'),
    RotatingInterface: require('./Interface/RotatingInterface.js'),
    Key1: require('./Key/Key1.js'),
    Key2: require('./Key/Key2.js'),
    Key3: require('./Key/Key3.js'),
    Key4: require('./Key/Key4.js'),
    Key5: require('./Key/Key5.js'),
    Key6: require('./Key/Key6.js'),
    Key7: require('./Key/Key7.js'),
    Key8: require('./Key/Key8.js'),
    MirrorDL: require('./Mirror/MirrorDL.js'),
    MirrorDR: require('./Mirror/MirrorDR.js'),
    MirrorUL: require('./Mirror/MirrorUL.js'),
    MirrorUR: require('./Mirror/MirrorUR.js'),
    Finish: require('./Misc/Finish.js'),
    Tank: require('./Misc/Tank.js'),
    WaterBlock: require('./Misc/WaterBlock.js'),
    BrokenMovableEnemyDown: require('./MovableEnemy/BrokenMovableEnemyDown.js'),
    BrokenMovableEnemyLeft: require('./MovableEnemy/BrokenMovableEnemyLeft.js'),
    BrokenMovableEnemyRight: require('./MovableEnemy/BrokenMovableEnemyRight.js'),
    BrokenMovableEnemyUp: require('./MovableEnemy/BrokenMovableEnemyUp.js'),
    MovableEnemyDown: require('./MovableEnemy/MovableEnemyDown.js'),
    MovableEnemyLeft: require('./MovableEnemy/MovableEnemyLeft.js'),
    MovableEnemyRight: require('./MovableEnemy/MovableEnemyRight.js'),
    MovableEnemyUp: require('./MovableEnemy/MovableEnemyUp.js'),
    MovableMirrorDL: require('./MovableMirror/MovableMirrorDL.js'),
    MovableMirrorDR: require('./MovableMirror/MovableMirrorDR.js'),
    MovableMirrorUL: require('./MovableMirror/MovableMirrorUL.js'),
    MovableMirrorUR: require('./MovableMirror/MovableMirrorUR.js'),
    RotatingMirrorDL: require('./RotatingMirror/RotatingMirrorDL.js'),
    RotatingMirrorDR: require('./RotatingMirror/RotatingMirrorDR.js'),
    RotatingMirrorUL: require('./RotatingMirror/RotatingMirrorUL.js'),
    RotatingMirrorUR: require('./RotatingMirror/RotatingMirrorUR.js'),
    Teleporter1: require('./Teleporter/Teleporter1.js'),
    Teleporter2: require('./Teleporter/Teleporter2.js'),
    Teleporter3: require('./Teleporter/Teleporter3.js'),
    Teleporter4: require('./Teleporter/Teleporter4.js'),
    Teleporter5: require('./Teleporter/Teleporter5.js'),
    Teleporter6: require('./Teleporter/Teleporter6.js'),
    Teleporter7: require('./Teleporter/Teleporter7.js'),
    Teleporter8: require('./Teleporter/Teleporter8.js'),
};



/* Define inheritance */
// Level 0
// BlockAbstract
// FireInterface
// MovableInterface
// RotatingInterface

// Level 1
blocks.EnemyAbstract.extends(blocks.FireInterface);
blocks.EnemyAbstract.extends(blocks.BlockAbstract);
blocks.MirrorAbstract.extends(blocks.BlockAbstract);
blocks.MovableEnemyAbstract.extends(blocks.MovableInterface);
blocks.MovableEnemyAbstract.extends(blocks.FireInterface);
blocks.MovableEnemyAbstract.extends(blocks.BlockAbstract);
blocks.MovableMirrorAbstract.extends(blocks.MovableInterface);
blocks.MovableMirrorAbstract.extends(blocks.BlockAbstract);
blocks.RotatingMirrorAbstract.extends(blocks.RotatingInterface);
blocks.RotatingMirrorAbstract.extends(blocks.BlockAbstract);
blocks.Block.extends(blocks.BlockAbstract);
blocks.CrossBlock.extends(blocks.BlockAbstract);
blocks.MovableBlock.extends(blocks.MovableInterface);
blocks.MovableBlock.extends(blocks.BlockAbstract);
blocks.Floor.extends(blocks.BlockAbstract);
blocks.Tank.extends(blocks.RotatingInterface);
blocks.Tank.extends(blocks.MovableInterface);
blocks.Tank.extends(blocks.FireInterface);
blocks.Tank.extends(blocks.BlockAbstract);

// Level 2
blocks.ArrowAbstract.extends(blocks.Floor);
blocks.DoorAbstract.extends(blocks.Block);
blocks.KeyAbstract.extends(blocks.Floor);
blocks.TeleporterAbstract.extends(blocks.Floor);
blocks.BreakableBlock.extends(blocks.Block);
blocks.DoubleMirrorDLUR.extends(blocks.MirrorAbstract);
blocks.DoubleMirrorDRUL.extends(blocks.MirrorAbstract);
blocks.BrokenEnemyDown.extends(blocks.Block);
blocks.BrokenEnemyLeft.extends(blocks.Block);
blocks.BrokenEnemyRight.extends(blocks.Block);
blocks.BrokenEnemyUp.extends(blocks.Block);
blocks.EnemyDown.extends(blocks.EnemyAbstract);
blocks.EnemyLeft.extends(blocks.EnemyAbstract);
blocks.EnemyRight.extends(blocks.EnemyAbstract);
blocks.EnemyUp.extends(blocks.EnemyAbstract);
blocks.Ice.extends(blocks.Floor);
blocks.Water.extends(blocks.Floor);
blocks.MirrorDL.extends(blocks.MirrorAbstract);
blocks.MirrorDR.extends(blocks.MirrorAbstract);
blocks.MirrorUL.extends(blocks.MirrorAbstract);
blocks.MirrorUR.extends(blocks.MirrorAbstract);
blocks.Finish.extends(blocks.Floor);
blocks.WaterBlock.extends(blocks.Floor);
blocks.BrokenMovableEnemyDown.extends(blocks.MovableBlock);
blocks.BrokenMovableEnemyLeft.extends(blocks.MovableBlock);
blocks.BrokenMovableEnemyRight.extends(blocks.MovableBlock);
blocks.BrokenMovableEnemyUp.extends(blocks.MovableBlock);
blocks.MovableEnemyDown.extends(blocks.MovableEnemyAbstract);
blocks.MovableEnemyLeft.extends(blocks.MovableEnemyAbstract);
blocks.MovableEnemyRight.extends(blocks.MovableEnemyAbstract);
blocks.MovableEnemyUp.extends(blocks.MovableEnemyAbstract);
blocks.MovableMirrorDL.extends(blocks.MovableMirrorAbstract);
blocks.MovableMirrorDR.extends(blocks.MovableMirrorAbstract);
blocks.MovableMirrorUL.extends(blocks.MovableMirrorAbstract);
blocks.MovableMirrorUR.extends(blocks.MovableMirrorAbstract);
blocks.RotatingMirrorDL.extends(blocks.RotatingMirrorAbstract);
blocks.RotatingMirrorDR.extends(blocks.RotatingMirrorAbstract);
blocks.RotatingMirrorUL.extends(blocks.RotatingMirrorAbstract);
blocks.RotatingMirrorUR.extends(blocks.RotatingMirrorAbstract);

// Level 3
blocks.ArrowDown.extends(blocks.ArrowAbstract);
blocks.ArrowLeft.extends(blocks.ArrowAbstract);
blocks.ArrowRight.extends(blocks.ArrowAbstract);
blocks.ArrowUp.extends(blocks.ArrowAbstract);
blocks.Door1.extends(blocks.DoorAbstract);
blocks.Door2.extends(blocks.DoorAbstract);
blocks.Door3.extends(blocks.DoorAbstract);
blocks.Door4.extends(blocks.DoorAbstract);
blocks.Door5.extends(blocks.DoorAbstract);
blocks.Door6.extends(blocks.DoorAbstract);
blocks.Door7.extends(blocks.DoorAbstract);
blocks.Door8.extends(blocks.DoorAbstract);
blocks.BreakedIce.extends(blocks.Ice);
blocks.Key1.extends(blocks.KeyAbstract);
blocks.Key2.extends(blocks.KeyAbstract);
blocks.Key3.extends(blocks.KeyAbstract);
blocks.Key4.extends(blocks.KeyAbstract);
blocks.Key5.extends(blocks.KeyAbstract);
blocks.Key6.extends(blocks.KeyAbstract);
blocks.Key7.extends(blocks.KeyAbstract);
blocks.Key8.extends(blocks.KeyAbstract);
blocks.Teleporter1.extends(blocks.TeleporterAbstract);
blocks.Teleporter2.extends(blocks.TeleporterAbstract);
blocks.Teleporter3.extends(blocks.TeleporterAbstract);
blocks.Teleporter4.extends(blocks.TeleporterAbstract);
blocks.Teleporter5.extends(blocks.TeleporterAbstract);
blocks.Teleporter6.extends(blocks.TeleporterAbstract);
blocks.Teleporter7.extends(blocks.TeleporterAbstract);
blocks.Teleporter8.extends(blocks.TeleporterAbstract);



/* Export the block list */
var BlockList = require('./BlockList.js');
module.exports = new BlockList(blocks);
