export class DatabaseConnection {
  static instance = null;

  constructor(config) {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }

    this.config = config;
    DatabaseConnection.instance = this;
  }

  async connect() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isConnected = true;
        resolve();
      }, 100);
    });
  }

  static getInstance(config) {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection(config);
    }
    return DatabaseConnection.instance;
  }

  static clearInstance() {
    DatabaseConnection.instance = null;
  }
}
