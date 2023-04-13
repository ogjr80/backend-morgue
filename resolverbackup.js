// resolvers.js
const db = require('./firestore');

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    getEmployee: async (_, { id }) => {
      const employeeRef = db.collection('employees').doc(id);
      const employeeDoc = await employeeRef.get();

      if (!employeeDoc.exists) {
        throw new Error(`Employee with ID ${id} not found.`);
      }

      return {
        id: employeeDoc.id,
        ...employeeDoc.data(),
      };
    },
    getEmployees: async () => {
      const employeesSnapshot = await db.collection('employees').get();
      return employeesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  },
  Mutation: {
    addEmployee: async (_, { firstName, lastName, email, age }) => {
      const employeeRef = db.collection('employees').doc();
      const employee = {
        id: employeeRef.id,
        firstName,
        lastName,
        email,
        age,
      };

      await employeeRef.set(employee);
      return employee;
    },
  },
};

module.exports = resolvers;
