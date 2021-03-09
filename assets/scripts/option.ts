
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    resetButton: cc.Button = null;

    @property(cc.Node)
    red: cc.Node = null;

    @property(cc.Node)
    blue: cc.Node = null;

    @property(cc.Node)
    green: cc.Node = null;

    @property(cc.Node)
    black: cc.Node = null;

    @property(cc.Node)
    blackbox: cc.Node = null;

    @property(cc.Node)
    redbox: cc.Node = null;
    
    @property(cc.Node)
    bluebox: cc.Node = null;
    
    @property(cc.Node)
    greenbox: cc.Node = null;
    
    @property(cc.Prefab)
    incorrect: cc.Node = null;

    @property(cc.Prefab)
    correct: cc.Node = null;
    // -------------------------
    mouseDown = false; //flag
    mouseDrag = false; //flag
    delta = null; //change in position of mouse pointer
    boudary = 51; //boundary of drop zone
    //check if the boxes have a bird inside it
    firstBox = false;
    secondBox = false;
    thirdBox = false;
    fourthBox = false;
    // Lock birds on correct answering
    lockBlue = false;
    lockBlack = false;
    lockRed = false;
    lockGreen = false;

    drag(thisNode: cc.Node){

        // Click
        thisNode.on(cc.Node.EventType.TOUCH_START, (Event)=> {
            this.mouseDown = true;
        });

        // Move
        thisNode.on(cc.Node.EventType.TOUCH_MOVE, (Event)=> {
            if(!this.mouseDown) 
                return;
            this.delta = Event.getPosition();
            thisNode.x += this.delta.x;
            thisNode.y += this.delta.y;
        });
        // Release
        thisNode.on(cc.Node.EventType.TOUCH_END, (Event)=> {
            this.mouseDown = false;
            
            // Move correct options to their positions
            if(this.lockBlack) this.black.setPosition(this.node.convertToWorldSpaceAR(cc.v2(this.blackbox.getPosition())));
            if(this.lockBlue) this.blue.setPosition(this.node.convertToWorldSpaceAR(cc.v2(this.bluebox.getPosition())));
            if(this.lockGreen) this.green.setPosition(this.node.convertToWorldSpaceAR(cc.v2(this.greenbox.getPosition())));
            if(this.lockRed) this.red.setPosition(this.node.convertToWorldSpaceAR(cc.v2(this.redbox.getPosition()))); 
            
            // Test for Black bird
            if (this.blackbox.getBoundingBox().contains(this.node.convertToNodeSpaceAR(thisNode.getPosition())) 
                && (this.firstBox == false))
            {
                thisNode.setPosition(this.node.convertToWorldSpaceAR(cc.v2(this.blackbox.getPosition())));
                this.firstBox = true;
                if(thisNode.name == "black")
                {
                    let blackCorrect = cc.instantiate(this.correct);
                    blackCorrect.parent = thisNode.parent;
                    blackCorrect.setPosition(thisNode.getPosition());
                    this.lockBlack = true;
                }
                else
                {
                    let blackIncorrect = cc.instantiate(this.incorrect);
                    blackIncorrect.parent = thisNode.parent;
                    blackIncorrect.setPosition(thisNode.getPosition());
                    this.firstBox = false;
                }
            }
            
            // Test for Blue bird
            if (this.bluebox.getBoundingBox().contains(this.node.convertToNodeSpaceAR(thisNode.getPosition())) 
                && (this.secondBox == false))
            {
                thisNode.setPosition(this.node.convertToWorldSpaceAR(cc.v2(this.bluebox.getPosition())));
                this.secondBox = true;
                if(thisNode.name == "blue")
                {
                    let blueCorrect = cc.instantiate(this.correct);
                    blueCorrect.parent = thisNode.parent;
                    blueCorrect.setPosition(thisNode.getPosition());
                    this.lockBlue = true;
                }
                else
                {
                    let blueIncorrect = cc.instantiate(this.incorrect);
                    blueIncorrect.parent = thisNode.parent;
                    blueIncorrect.setPosition(thisNode.getPosition());
                    this.secondBox = false;
                }
            }
            
            // Test for Red bird
            if (this.redbox.getBoundingBox().contains(this.node.convertToNodeSpaceAR(thisNode.getPosition())) 
                && (this.thirdBox == false))
            {
                thisNode.setPosition(this.node.convertToWorldSpaceAR(cc.v2(this.redbox.getPosition())));
                this.thirdBox = true;
                if(thisNode.name == "red")
                {
                    let redCorrect = cc.instantiate(this.correct);
                    redCorrect.parent = thisNode.parent;
                    redCorrect.setPosition(thisNode.getPosition());
                    this.lockRed = true;
                }
                else
                {
                    let redIncorrect = cc.instantiate(this.incorrect);
                    redIncorrect.parent = thisNode.parent;
                    redIncorrect.setPosition(thisNode.getPosition());
                    this.thirdBox = false;
                }
            }
            
            // Test for Green bird
            if (this.greenbox.getBoundingBox().contains(this.node.convertToNodeSpaceAR(thisNode.getPosition())) 
                && (this.fourthBox == false))
            {
                thisNode.setPosition(this.node.convertToWorldSpaceAR(cc.v2(this.greenbox.getPosition())));
                this.fourthBox = true;
                if(thisNode.name == "green")
                {
                    let greenCorrect = cc.instantiate(this.correct);
                    greenCorrect.parent = thisNode.parent;
                    greenCorrect.setPosition(thisNode.getPosition());
                    this.lockGreen = true;
                    this.node.emit('sendmsg');
                }
                else
                {
                    let greenIncorrect = cc.instantiate(this.incorrect);
                    greenIncorrect.parent = thisNode.parent;
                    greenIncorrect.setPosition(thisNode.getPosition());
                    this.fourthBox = false;
                }
            }
        });
    }

    // onLoad () {}

    start () {
    }

    update (dt) {
        if(!this.mouseDown)
        {
            this.drag(this.node);
        }
    }
}
