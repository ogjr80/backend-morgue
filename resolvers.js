const db = require('./firestore'); 



// Resolvers
  const resolvers = {
    Query: {
      getContact: async (_, { id }) => {
        const contactRef = db.collection("contacts").doc(id);
        const contactDoc = await contactRef.get();
        if (!contactDoc.exists) {
          throw new Error("Contact not found");
        }
        return { id: contactDoc.id, ...contactDoc.data() };
      },
      getAllContacts: async () => {
        const contactsSnapshot = await db.collection("contacts").get();
        return contactsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      },
    },
    Mutation: {
      createContact: async (_, { input }) => {
        const newContactRef = await db.collection("contacts").add(input);
        const newContact = { id: newContactRef.id, ...input };
        return newContact;
      },
      updateContact: async (_, { id, input }) => {
        const contactRef = db.collection("contacts").doc(id);
        await contactRef.update(input);
        const updatedContact = { id, ...input };
        return updatedContact;
      },
      deleteContact: async (_, { id }) => {
        const contactRef = db.collection("contacts").doc(id);
        const doc = await contactRef.get();
        if (!doc.exists) {
          throw new Error("Contact not found");
        }
        await contactRef.delete();
        return id;
      },
    },
  };
  

  module.exports = resolvers;
