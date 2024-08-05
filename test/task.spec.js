import { expect } from 'chai'; // Import expect from chai
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { DeactivateInactivePersons } from '../src/task.js';



describe('DeactivateInactivePersons', () => {
  let listAllUsersStub, 
      filterStub,
      getPersonInactiveDurationStub,
      mapStub, 
      remindUsersBeforeDisablingTheAccountStub, 
      disableUsersStub, 
      deactivateUserFromFireStoreStub;

  let admin, 
  fs, 
  pgToken;

  beforeEach(() => {
  
    listAllUsersStub = sinon.stub().resolves({
      users: [{ uid: 'user1', disabled: false, email: 'user1@gmail.com' }],
      pageToken: null
    });
    filterStub = sinon.stub();
    getPersonInactiveDurationStub = sinon.stub();
    mapStub = sinon.stub();

    remindUsersBeforeDisablingTheAccountStub = sinon.stub().resolves();
    disableUsersStub = sinon.stub().resolves();
    deactivateUserFromFireStoreStub = sinon.stub().resolves();

    
    filterStub.withArgs([{ uid: 'user1', disabled: false, email: 'user1@gmail.com' }], sinon.match.any).returns([{ uid: 'user1', disabled: false, email: 'user1@gmail.com' }]);
    getPersonInactiveDurationStub.returns(91 * 24 * 60 * 60 * 1000); 
    mapStub.withArgs([{ uid: 'user1', disabled: false, email: 'user1@gmail.com' }], 'uid').returns(['user1']);
    mapStub.withArgs([{ uid: 'user1', disabled: false, email: 'user1@gmail.com' }], 'email').returns(['user1@gmail.com']);

    admin = {  auth: sinon.stub() };
    fs = {};
    pgToken = null;
  });

  
  it('should handle successful deactivation of inactive users', async () => {
    const auth = {
      listUsers: sinon.stub().resolves({
        users: [{ uid: 'user1', email: 'user1@example.com', disabled: false }],
        pageToken: null
      })
    };

    admin.auth = sinon.stub().returns(auth);
    const now = Date.now();

   
    listAllUsersStub.resolves({ users: [{ uid: 'user1', email: 'user1@example.com', disabled: false }], pageToken: null });
    filterStub.withArgs(sinon.match.array, sinon.match.func).callsFake((array, func) => array.filter(func));
    getPersonInactiveDurationStub.returns(91 * 24 * 60 * 60 * 1000); 
    mapStub.withArgs(sinon.match.array, 'uid').returns(['user1']);
    remindUsersBeforeDisablingTheAccountStub.resolves();
    disableUsersStub.resolves();
    deactivateUserFromFireStoreStub.resolves();

    const result = await DeactivateInactivePersons(fs, pgToken);

    expect(result).to.deep.equal({ pageToken: null });
    expect(remindUsersBeforeDisablingTheAccountStub).to.have.been.calledOnce;
    expect(disableUsersStub).to.have.been.calledOnce;
    expect(deactivateUserFromFireStoreStub).to.have.been.calledOnce;
  });

  it('should handle errors', async () => {
    admin.auth = sinon.stub().returns(null); 

    const result = await DeactivateInactivePersons(fs, pgToken);

    expect(result).to.have.property('error');
    expect(result.pageToken).to.be.null;
  });

  afterEach(() => {
    sinon.restore();
  });
});
