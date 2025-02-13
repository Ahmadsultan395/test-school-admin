import * as admin from "firebase-admin";

admin.initializeApp();

const auth = admin.auth();
const db = admin.firestore();
const storage = admin.storage();

db.settings({
  timestampsInSnapshots: true,
  ignoreUndefinedProperties: true,
});

export {
  admin,
  auth,
  db,
  storage
};
