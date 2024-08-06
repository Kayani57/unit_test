export const PATransactionModel = {
    runTask: async (db, id, parentId) => {
      // Dummy implementation, you can customize this as needed

      return Promise.resolve();
    }
  };
  
  // Mock for GoogleCloudTask (if needed)
  export class GoogleCloudTask {
    constructor() {
      this.DB = {}; // Dummy DB object
    }
  }
  // constants.js

export const PA_TRANSACTION_QUEUE_NAME = 'test_queue_name';
export const PA_TRANSACTION_QUEUE = 'test_queue_location';
