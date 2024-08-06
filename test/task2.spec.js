import sinon from 'sinon';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import { PATransactionTask } from '../src/task2.js'; // Adjust path accordingly

import { PATransactionModel } from '../src/function2.js';

const { expect } = chai;

// Configure Chai to use Sinon-Chai
chai.use(sinonChai);


describe('PATransactionTask', function () {
  let instance;
  let runTaskStub;
  let mockTask;
  let consoleError;
  let FalseMockTask;
  


  beforeEach(function () {
    instance = new PATransactionTask();
    runTaskStub = sinon.stub(PATransactionModel, 'runTask').resolves();
    mockTask = {
      payload: Buffer.from(JSON.stringify({ id: '123', parentId: '456' })).toString('base64')
      };

      FalseMockTask={
        payload: Buffer.from('invalid_base64').toString('base64')
      }
      consoleError = sinon.stub(console, 'error');

  });
  afterEach(function () {
    runTaskStub.restore();
    consoleError.restore();
  });

    it('should process the task and call PATransactionModel.runTask with correct parameters', async () => {
      
      runTaskStub.resolves(); 
  
     
      await instance.run(null, mockTask);
  
     
      expect(runTaskStub).to.have.been.calledOnceWith(instance.DB, '123', '456');
    
    });
    it('should not process the task and call PATransactionModel.runTask when incorrect parameters are passed', async () => {
     
      runTaskStub.resolves(); 
  
     
      await instance.run(null,FalseMockTask);
  
     
      expect(runTaskStub).to.not.have.been.called;
      expect(consoleError).to.have.been.calledOnce;
    
    });
    it('should not process the task if no task is provided', async () => {
      runTaskStub.resolves();
      await instance.run(null,null);

      expect(runTaskStub).to.not.have.been.called;
      expect(consoleError).to.not.have.been.called;});
      it("should throw error if json missing some field",async()=>{
        runTaskStub.resolves();
        let task={
          payload:Buffer.from(JSON.stringify({id:'123'})).toString('base64')
        }
        await instance.run(null,task);
        expect(runTaskStub).to.not.have.been.called;
      expect(consoleError).to.have.been.called;


      })

})