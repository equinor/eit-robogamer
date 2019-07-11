import './state.js';

export class Render{
    constructor(state){
        this.state = state;

        let self = this;
        function step(_) {
            self.render()
            window.requestAnimationFrame(step);
        }
        
        window.requestAnimationFrame(step);
    }

    render(){
        console.log(this.state);
    }


}