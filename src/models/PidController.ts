const NUM_SAVED_ERR = 3;
const TIMESTEP = 0.1;
const NUM_SAVED_INP = 2;

export default class PidController {
  private prevErr: number[] = [];
  private prevInp: number[] = [];
  // private a: number;
  // private b: number;
  // private c: number;
  private error_sign: number;

  constructor(private Kp: number, private Ki: number, private Kd: number) {
    this.error_sign = 0;
    for(let i = 0; i < NUM_SAVED_ERR; i++){
        this.prevErr.push(0);
    }
    for(let i = 0; i < NUM_SAVED_INP; i++){
        this.prevInp.push(0);
    }
    //Init konstants for update function
    // this.a = Kp + Ki*(TIMESTEP/2) + Kd/TIMESTEP;
    // this.b = -Kp + Ki*(TIMESTEP/2) -2*Kd/TIMESTEP;
    // this.c = Kd/TIMESTEP;
  }

  public changeParams(newKp: number, newKi: number, newKd: number): void {
      this.Kp = newKp;
      this.Ki = newKi;
      this.Kd = newKd;
  }

  private saveNewErr(diff: number): void {
      if(this.error_sign == diff / Math.abs(diff) || this.error_sign == 0){
          let tempErrA: number = diff;
          let tempErrB: number;
          for (let i = 0; i < NUM_SAVED_ERR; i++){
              tempErrB = this.prevErr[i];
              this.prevErr[i] = tempErrA;
              tempErrA = tempErrB;
          }
      }
      else {
          for(let i = 0; i < NUM_SAVED_ERR; i++){
              this.prevErr[i] = 0;
          }
          this.prevErr[0] = diff;
      }
      this.error_sign = diff / Math.abs(diff);
  }

  public updateInput(error: number): void {
      this.saveNewErr(error);
  }

  public getInput(): number {
      //u[k] = u[k-1] + a*e[k] + b*e[k-1] + c*e[k-2]
      //double u = prevInp[0] + a*prevErr[0] + b*prevErr[1] + c*prevErr[2];
      let derivative = ((this.prevErr[0] - this.prevErr[1]) / TIMESTEP + (this.prevErr[1] - this.prevErr[2]) / TIMESTEP) / 2;
      let u = this.Kp * this.prevErr[0] + this.Ki*(this.prevErr[0] + this.prevErr[1] + this.prevErr[2]) * TIMESTEP + this.Kd * (derivative);
      this.saveNewInput(u);
      return u;
  }

  private saveNewInput(input: number): void {
      let tempInpA: number = input;
      let tempInpB: number;
      let i: number;
      for (i = 0; i < NUM_SAVED_INP; i++){
          tempInpB = this.prevInp[i];
          this.prevInp[i] = tempInpA;
          tempInpA = tempInpB;
      }
  }
}
